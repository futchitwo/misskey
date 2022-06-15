import { db } from '@/db/postgre.js';
import { ChannelSubCategory } from '@/models/entities/channel-sub-category.js';
import { Packed } from '@/misc/schema.js';

export const ChannelSubCategoryRepository = db.getRepository(ChannelSubCategory).extend({
	async pack(
		src: ChannelSubCategory,
	): Promise<Packed<'ChannelSubCategory'>> {
		return {
            id: src.id,
			name: src.name,
            description: src.description,
            categoryId: src.categoryId,
            category: src.category,
            iconUrl: src.iconUrl,
            appStoreId: src.appStoreId,
            googlePlayId: src.googlePlayId,
            steamId: src.steamId,
            epicStoreId: src.epicStoreId,
        };
	},

	packMany(
		ChannelSubCategories: ChannelSubCategory[],
	) {
		return Promise.all(ChannelSubCategories.map(x => this.pack(x)));
	},
});
