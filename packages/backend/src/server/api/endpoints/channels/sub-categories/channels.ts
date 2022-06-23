import define from '../../../define.js';
import { Channels, ChannelSubCategories } from '@/models/index.js';
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
		noSuchSubCategory: {
			message: 'No such sub-category.',
			code: 'NO_SUCH_SUB_CATEGORY',
			id: 'da984385-054d-4b5a-8dc9-8eaffe2d3766',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		subCategoryId: { type: 'string', format: 'misskey:id' },
		sinceId: { type: 'string', format: 'misskey:id' },
		untilId: { type: 'string', format: 'misskey:id' },
		limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
	},
	required: ['subCategoryId'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, me) => {
	const subCategory = await ChannelSubCategories.findOneBy({
		id: ps.subCategoryId,
	});

	if (subCategory == null) {
		throw new ApiError(meta.errors.noSuchSubCategory);
	}

	const query = makePaginationQuery(Channels.createQueryBuilder('channel'), ps.sinceId, ps.untilId)
		.andWhere('channel.lastNotedAt IS NOT NULL')
		.andWhere('channel.subCategoryId = :subCategoryId', { subCategoryId: ps.subCategoryId })
		.orderBy('channel.lastNotedAt', 'DESC');

	const channels = await query.take(ps.limit).getMany();

	return await Promise.all(channels.map(x => Channels.pack(x, me)));
});
