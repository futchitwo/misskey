import define from '../../define.js';
import { ApiError } from '../../error.js';
import { Channels, ChannelNotePinings, Notes } from '@/models/index.js';
import { isChannelManager } from '@/misc/is-channel-manager.js';

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
			id: '6f6c314b-7486-4897-8966-c04a66a02923',
		},

		accessDenied: {
			message: 'You do not have edit privilege of the channel.',
			code: 'ACCESS_DENIED',
			id: '82b179d8-ff32-41f0-bc5c-28c8cdcd6229',
		},

		noSuchNote: {
			message: 'No such note.',
			code: 'NO_SUCH_NOTE',
			id: '6d52697f-74cb-4c9f-8bd4-a7d2e1193fd1',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		channelId: { type: 'string', format: 'misskey:id' },
		noteId: { type: 'string', format: 'misskey:id' },
	},
	required: ['channelId', 'noteId'],
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

	const note = await Notes.findOneBy({
		id: ps.noteId,
	});

	if (note == null) {
		throw new ApiError(meta.errors.noSuchNote);
	}

	await ChannelNotePinings.delete({
		channelId: channel.id,
		noteId: ps.noteId,
	});

	//return await Channels.pack(channel, me);
});
