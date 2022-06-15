import { db } from '@/db/postgre.js';
import { ChannelSubCategory } from '@/models/entities/channel-sub-category.js';
import { Packed } from '@/misc/schema.js';

export const ChannelSubCategoryRepository = db.getRepository(ChannelSubCategory).extend({
	async pack(
		src: ChannelSubCategory | string,
	): Promise<Packed<'ChannelSubCategory'>> {
        const subCategory = typeof src === 'object' ? src : await this.findOneByOrFail({ id: src });

		return {
            id: subCategory.id,
			name: subCategory.name,
            description: subCategory.description,
            category: subCategory.category,
            iconUrl: subCategory.iconUrl,
            lastActivityAt: subCategory.lastActivityAt,
            appStoreId: subCategory.appStoreId,
            googlePlayId: subCategory.googlePlayId,
            steamId: subCategory.steamId,
            epicStoreId: subCategory.epicStoreId,
            channelsCount :subCategory.channelsCount
        };
	},

	packMany(
		ChannelSubCategories: ChannelSubCategory[],
	) {
		return Promise.all(ChannelSubCategories.map(x => this.pack(x)));
	},
});
