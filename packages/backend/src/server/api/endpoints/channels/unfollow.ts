import define from '../../define.js';
import { ApiError } from '../../error.js';
import { Channels, ChannelFollowings } from '@/models/index.js';
import { publishUserEvent } from '@/services/stream.js';

export const meta = {
	tags: ['channels'],

	requireCredential: true,

	kind: 'write:channels',

	errors: {
		noSuchChannel: {
			message: 'No such channel.',
			code: 'NO_SUCH_CHANNEL',
			id: '19959ee9-0153-4c51-bbd9-a98c49dc59d6',
		},

		notFollowing: {
			message: 'Not following.',
			code: 'NOT_FOLLOWING',
			id: 'a87dc844-6a90-47df-87eb-c94894cf36f0',
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

	const channelFollowing = await ChannelFollowings.findOneBy({
		followerId: user.id,
		followeeId: channel.id,
	});
	
	if (channelFollowing == null) {
		throw new ApiError(meta.errors.notFollowing);
	}

	ChannelFollowings.delete({
		followerId: user.id,
		followeeId: channel.id,
	});
  
	Channels.decrement({ id: channel.id }, 'usersCount', 1);

	publishUserEvent(user.id, 'unfollowChannel', channel);
});
