import define from '../../define.js';
import { ApiError } from '../../error.js';
import { ChannelSubCategories } from '@/models/index.js';
import { genId } from '@/misc/gen-id.js';
import { CHANNEL_CATEGORIES } from '@/const.js';

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
		noSuchCategory: {
			message: 'No such category.',
			code: 'NO_SUCH_CATEGORY',
			id: 'd34f9682-6163-4e00-8b91-df55359496d9',
		},

        notGameCategory: {
            message: 'You can add only game category.',
            code: 'NOT_GAME_CATEGORY',
            id: '5e354671-2f3e-4a2b-bed9-12ef26453f59',
        },

        emptyStoreIds: {
            message: 'Store Ids is empty.',
            code: 'EMPTY_STORE_IDS',
            id: '773527d8-27fc-42e7-a1b8-ea9e8378f1b6',
        },
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 1, maxLength: 128 },
		description: { type: 'string', nullable: true, minLength: 1, maxLength: 256 },
		category: { type: 'string', minLength: 1, maxLength: 64 },
        appStoreId: { type: 'string', nullable: true, minLength: 1, maxLength: 64 },
        googlePlayId: { type: 'string', nullable: true, minLength: 1, maxLength: 256 },
        steamId: { type: 'string', nullable: true, minLength: 1, maxLength: 64 },
        epicStoreId: { type: 'string', nullable: true, minLength: 1, maxLength: 256 },
        siteUrl: { type: 'string', nullable: true, minLength: 1, maxLength: 256 },
        iconUrl: { type: 'string', nullable: true, minLength: 1, maxLength: 256 },
	},
	required: ['name', 'category'],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, user) => {
	const category = CHANNEL_CATEGORIES.find(cat => cat.category === ps.category);

    if (!category) throw new ApiError(meta.errors.noSuchCategory);
    if (!category.isGame) throw new ApiError(meta.errors.notGameCategory);

    if (
        ps.appStoreId == null &&
        ps.googlePlayId == null &&
        ps.steamId == null &&
        ps.epicStoreId == null 
    ) throw new ApiError(meta.errors.emptyStoreIds);

    // TODO: check game store

	const subCategory = await ChannelSubCategories.insert({
		id: genId(),
		createdAt: new Date(),
        lastActivityAt: new Date(),
		name: ps.name,
		description: ps.description || null,
		iconUrl: iconUrl || null,
        category: ps.category,
        ...(category.isGame ? {
            appStoreId: ps.appStoreId || null,
            googlePlayId: ps.googlePlayId || null,
            steamId: ps.steamId || null,
            epicStoreId: ps.epicStoreId || null,
        }: {}),
	}).then(x => ChannelSubCategories.findOneByOrFail(x.identifiers[0]));

	return await ChannelSubCategories.pack(subCategory);
});
