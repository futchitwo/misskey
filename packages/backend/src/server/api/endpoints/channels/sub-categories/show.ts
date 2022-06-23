import { ChannelSubCategories } from '@/models/index.js';
import define from '../../../define.js';
import { ApiError } from '../../../error.js';

export const meta = {
	tags: ['channels'],

	requireCredential: false,

	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'Channel',
	},

	errors: {
		noSuchSubCategory: {
			message: 'No such sub category.',
			code: 'NO_SUCH_SUB_CATEGORY',
			id: 'f0249280-4bf8-4b09-b727-047e59224bc3',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		subCategoryId: { type: 'string', format: 'misskey:id' },
	},
	required: ['subCategoryId'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, user) => {
	const subCategory = await ChannelSubCategories.findOneBy({
		id: ps.subCategoryId,
	});

	if (subCategory == null) {
		throw new ApiError(meta.errors.noSuchSubCategory);
	}

	return await ChannelSubCategories.pack(subCategory);
});
