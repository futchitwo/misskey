import { ChannelSubCategories } from '@/models/index.js';
import { CHANNEL_CATEGORIES } from '@/const.js';
import define from '../../../define.js';
import { ApiError } from '../../../error.js';
import { makePaginationQuery } from '../../../common/make-pagination-query.js';

export const meta = {
	tags: ['channels'],

	requireCredential: false,

	res: {
		type: 'array',
		optional: false, nullable: false,
		items: {
			type: 'object',
			optional: false, nullable: false,
			ref: 'Channel',
		},
	},

	errors: {
		noSuchCategory: {
			message: 'No such category.',
			code: 'NO_SUCH_CATEGORY',
			id: 'c125edbb-09c1-4f8e-a8ba-fe8cc31351a6',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		category: { type: 'string', minLength: 1, maxLength: 64 },
		sinceId: { type: 'string', format: 'misskey:id' },
		untilId: { type: 'string', format: 'misskey:id' },
		limit: { type: 'integer', minimum: 1, maximum: 100, default: 15 },
	},
	required: ['category'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, user) => {
	const category = CHANNEL_CATEGORIES.find(cat => cat.category === ps.category);

	if (!category) throw new ApiError(meta.errors.noSuchCategory);

	const query = makePaginationQuery(ChannelSubCategories.createQueryBuilder('subCategory'), ps.sinceId, ps.untilId) 
    .andWhere('subCategory.category = :category', { category: ps.category })
		.andWhere('subCategory.lastActivityAt IS NOT NULL')
    .orderBy('subCategory.lastActivityAt', 'DESC');
	
	const subCategories = await query.take(ps.limit).getMany();
	return await Promise.all(subCategories.map(x => ChannelSubCategories.pack(x)));
});
