import define from '../../define.js';
import { ApiError } from '../../error.js';
import { Channels, ChannelNotePinings, Notes } from '@/models/index.js';

export const meta = {
	tags: ['channels'],

	requireCredential: false,

	res: {
		type: 'array',
		optional: false, nullable: false,
		items: {
			type: 'object',
			optional: false, nullable: false,
			ref: 'Note',
		},
	},

	errors: {
		noSuchChannel: {
			message: 'No such channel.',
			code: 'NO_SUCH_CHANNEL',
			id: '6f6c314b-7486-4897-8966-c04a66a02923',
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
export default define(meta, paramDef, async (ps, me) => {
	const channel = await Channels.findOneBy({
		id: ps.channelId,
	});

	if (channel == null) {
		throw new ApiError(meta.errors.noSuchChannel);
	}

	const pins = await ChannelNotePinings.createQueryBuilder('pin')
	.where('pin.channelId = :channelId', { channelId: channel.id })
	.innerJoinAndSelect('pin.note', 'note')
	.orderBy('pin.id', 'DESC')
	.getMany();

	//return await Channels.pack(channel, me);
	return await Notes.packMany(pins.map(pin => pin.note!), me, {
		detail: true,
	});
});
