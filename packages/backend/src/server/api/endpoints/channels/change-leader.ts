import define from '../../define.js';
import { ApiError } from '../../error.js';
import { getUser } from '../../common/getters.js';
import { Channels, Blockings, ChannelFollowings } from '@/models/index.js';

export const meta = {
	tags: ['channels'],

	requireCredential: true,

	kind: 'write:channels',

	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'Channel',
	},

	errors: {
		noSuchChannel: {
			message: 'No such channel.',
			code: 'NO_SUCH_CHANNEL',
			id: 'f9c5467f-d492-4c3c-9a8d-a70dacc86512',
		},

		accessDenied: {
			message: 'You do not have edit privilege of the channel.',
			code: 'ACCESS_DENIED',
			id: '1fb7cb09-d46a-4fdf-b8df-057788cce513',
		},

		noSuchUser: {
			message: 'No such user.',
			code: 'NO_SUCH_USER',
			id: '8514183b-0c33-4694-bbb0-127ff58b44b2',
		},

		blocking: {
			message: 'You are blocking that user.',
			code: 'BLOCKING',
			id: 'e2d615a8-4fb0-4d5e-9aae-de2ff958c70e',
		},

		newLeaderIsNotFollowingChannel: {
			message: 'New leader is not following channel.',
			code: 'NEW_LEADER_IS_NOT_FOLLOWING_CHANNEL',
			id: '41f1d409-2055-4646-b723-86c24a2fbb16',
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

	if (channel.userId !== me.id) {
		throw new ApiError(meta.errors.accessDenied);
	}

  // Get newLeader
	const newLeader = await getUser(ps.userId).catch(err => {
		if (err.id === '15348ddd-432d-49c2-8a5a-8069753becff') throw new ApiError(meta.errors.noSuchUser);
		throw err;
	});

  // Check if blocking
	const blocking = await Blockings.findOneBy({
		blockerId: me.id,
		blockeeId: newLeader.id,
	});

  if (blocking != null) {
		throw new ApiError(meta.errors.blocking);
	}

	// chack newLeader following channel
	const newLeaderFollowing = await ChannelFollowings.findOneBy({
		followerId: newLeader.id,
		followeeId: channel.id,
	});

	if (newLeaderFollowing == null) {
		throw new ApiError(meta.errors.newLeaderIsNotFollowingChannel);
	}

	await Channels.update(channel.id, {
		userId: newLeader.id,
	});

	return await Channels.pack(channel.id, me);
});
