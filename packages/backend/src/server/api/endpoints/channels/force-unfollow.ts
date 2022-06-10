import define from '../../define.js';
import { ApiError } from '../../error.js';
import { Channels, ChannelFollowings } from '@/models/index.js';
import { publishUserEvent } from '@/services/stream.js';
import { isChannelManager } from '@/misc/is-channel-manager.js';

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

		accessDenied: {
			message: 'You do not have edit privilege of the channel.',
			code: 'ACCESS_DENIED',
			id: '5b43d65d-0c9b-4c72-9c9b-e09436940e10',
		},

		followerIsYourself: {
			message: 'Follower is yourself.',
			code: 'FOLLOWER_IS_YOURSELF',
			id: '68683042-afa4-4324-8b06-169fb4707d56',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		channelId: { type: 'string', format: 'misskey:id' },
		userId: { type: 'string', format: 'misskey:id' },
	},
	required: ['channelId', 'userId'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, me) => {
	const channel = await Channels.findOneBy({
		id: ps.channelId,
	});

	if (channel == null) {
		throw new ApiError(meta.errors.noSuchChannel);
	}

	if (!isChannelManager(me.id, channel)) {
		throw new ApiError(meta.errors.accessDenied);
	}
  
	// 自分自身
	if (me.id === ps.userId) {
		throw new ApiError(meta.errors.followerIsYourself);
	}

	await ChannelFollowings.delete({
		followerId: ps.userId,
		followeeId: channel.id,
	});

	Channels.decrement({ id: channel.id }, 'usersCount', 1);

	publishUserEvent(ps.userId, 'unfollowChannel', channel);
});
