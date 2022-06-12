import define from '../../define.js';
import { ApiError } from '../../error.js';
import { Channels, ChannelFollowings, ChannelBannedUsers, ChannelFollowRequests } from '@/models/index.js';
import { genId } from '@/misc/gen-id.js';
import { publishUserEvent } from '@/services/stream.js';

export const meta = {
	tags: ['channels'],

	requireCredential: true,

	kind: 'write:channels',

	errors: {
		noSuchChannel: {
			message: 'No such channel.',
			code: 'NO_SUCH_CHANNEL',
			id: 'c0031718-d573-4e85-928e-10039f1fbb68',
		},

		youAreBanned: {
			message: 'You are banned this channel.',
			code: 'YOU_ARE_BANNED',
			id: '19e5d4a8-44cc-4451-840e-f732c6e40608',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		channelId: { type: 'string', format: 'misskey:id' },
	},
	required: ['channelId'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, user) => {
	const channel = await Channels.findOneBy({
		id: ps.channelId,
	});

	if (channel == null) {
		throw new ApiError(meta.errors.noSuchChannel);
	}

	const banned = await ChannelBannedUsers.findOneBy({
		channelId: channel.Id,
		userId: user.id,
	});

	if (banned != null) {
		throw new ApiError(meta.errors.youAreBanned);
	}

	if (channel.approvalOnly) {
		await ChannelFollowRequests.insert({
			id: genId(),
			createdAt: new Date(),
			followerId: user.id,
			followeeId: channel.id,
		});
		// TODO: Notice
	} else {
		await ChannelFollowings.insert({
			id: genId(),
			createdAt: new Date(),
			followerId: user.id,
			followeeId: channel.id,
		});

		Channels.increment({ id: channel.id }, 'usersCount', 1);

		publishUserEvent(user.id, 'followChannel', channel);
	}
});
