import define from '../../define.js';
import { ApiError } from '../../error.js';
import { ChannelSubCategories } from '@/models/index.js';
import { Channel } from '@/models/entities/channel.js';
import { genId } from '@/misc/gen-id.js';

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
	},
	required: ['category'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, user) => {
    const category = CHANNEL_CATEGORIES.find(cat => cat.category === ps.category);

    if (!category) throw new ApiError(meta.errors.noSuchCategory);

	const subCategories = await ChannelSubCategories.createQueryBuilder('subCategory')
    .where('subCategory.lastActivutyAt IS NOT NULL')
    .orderBy('subCategory.lastActivitydAt', 'DESC');
	
	return await ChannelSubCategories.packMany(subCategories);
});
