import define from '../../../define.js';
import { ApiError } from '../../../error.js';
import { getUser } from '../../../common/getters.js';
import { Channels, Blockings, ChannelFollowings, ChannelSubLeaders } from '@/models/index.js';
import { genId } from '@/misc/gen-id.js';

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

		newSubLeaderIsNotFollowingChannel: {
			message: 'New sub leader is not following channel.',
			code: 'NEW_LEADER_IS_NOT_FOLLOWING_CHANNEL',
			id: '41f1d409-2055-4646-b723-86c24a2fbb16',
		},

		tooManySubLeaders: {
			message: 'No more than three sub-leaders may be appointed.',
			code: 'TOO_MANY_SUB_LEADERS',
			id: '7c3fcd75-98fd-44b6-a4e2-ccac32d8d340',
		},

		alreadyAppointed: {
			message: 'This user is already appointed as a sub-leader.',
			code: 'ALREADTY_APPOINTED',
			id: '337cb909-49c2-4348-873c-342acef0a360',
		},

		isLeader: {
			message: 'This user is leader.',
			code: 'isLeader',
			id: 'c2de747c-2729-4b6a-b71c-ac077368193d',
		}
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

	// check if leader
	if (newLeader.id === channel.userId) {
		throw new ApiError(meta.errors.isLeader);
	}

	// Check if blocking
	const blocking = await Blockings.findOneBy({
		blockerId: me.id,
		blockeeId: newLeader.id,
	});

	if (blocking != null) {
		throw new ApiError(meta.errors.blocking);
	}

	// chack newSubLeader following channel
	const newSubLeaderFollowing = await ChannelFollowings.findOneBy({
		followerId: newLeader.id,
		followeeId: channel.id,
	});

	if (newSubLeaderFollowing == null) {
		throw new ApiError(meta.errors.newSubLeaderIsNotFollowingChannel);
	}

	// check subLeader is too many
	const subLeaders = await ChannelSubLeaders.countBy({
		channelId: channel.id,
	});

	if (subLeaders >= 3) {
		throw new ApiError(meta.errors.tooManySubLeaders);
	}

	// check subLeader is already appointed
	const subLeader = await ChannelSubLeaders.findOneBy({
		userId: newLeader.id,
		channelId: channel.id,
	});

	if (subLeader != null) {
		throw new ApiError(meta.errors.alreadyAppointed);
	}

	await ChannelSubLeaders.insert({
		id: genId(),
		createdAt: new Date(),
		channelId: channel.id,
		userId: newLeader.id,
	});

	return await Channels.pack(channel.id, me);
});
