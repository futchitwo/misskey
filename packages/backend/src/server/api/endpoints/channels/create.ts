import define from '../../define.js';
import { ApiError } from '../../error.js';
import { Channels, ChannelFollowings, DriveFiles, ChannelSubCategories } from '@/models/index.js';
import { Channel } from '@/models/entities/channel.js';
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
		noSuchFile: {
			message: 'No such file.',
			code: 'NO_SUCH_FILE',
			id: 'cd1e9f3e-5a12-4ab4-96f6-5d0a2cc32050',
		},
		noSuchSubCategory: {
			message: 'No such sub-category.',
			code: 'NO_SUCH_SUB_CATEGORY',
			id: 'e0a455c9-e7b9-42e3-aa89-9c26bdc34331',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 1, maxLength: 128 },
		subCategoryId: { type: 'string', format: 'misskey:id' },
		description: { type: 'string', nullable: true, minLength: 1, maxLength: 2048 },
		bannerId: { type: 'string', format: 'misskey:id', nullable: true },
		approvalOnly: { type: 'boolean' },
	},
	required: ['name', 'subCategoryId'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, user) => {
	let banner = null;
	if (ps.bannerId != null) {
		banner = await DriveFiles.findOneBy({
			id: ps.bannerId,
			userId: user.id,
		});

		if (banner == null) {
			throw new ApiError(meta.errors.noSuchFile);
		}
	}

	const subCategory = await ChannelSubCategories.findOneBy({
		id: ps.subCategoryId,
	});

	if (subCategory == null) {
		throw new ApiError(meta.errors.noSuchSubCategory);
	}

	const channel = await Channels.insert({
		id: genId(),
		createdAt: new Date(),
		userId: user.id,
		name: ps.name,
		description: ps.description || null,
		subCategoryId: subCategory.id,
		bannerId: banner ? banner.id : null,
		approvalOnly: ps.approvalOnly || false,
	} as Channel).then(x => Channels.findOneByOrFail(x.identifiers[0]));

	await ChannelFollowings.insert({
		id: genId(),
		createdAt: new Date(),
		followerId: user.id,
		followeeId: channel.id,
	});

	Channels.increment({ id: channel.id }, 'usersCount', 1);
	
	ChannelSubCategories.increment({ id: subCategory.id }, 'channelsCount', 1);
	
	return await Channels.pack(channel, user);
});
