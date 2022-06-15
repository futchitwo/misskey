import { db } from '@/db/postgre.js';
import { ChannelCategory } from '@/models/entities/channel-category.js';
import { Packed } from '@/misc/schema.js';

export const ChannelCategoryRepository = db.getRepository(ChannelCategory).extend({
	async pack(
		src: ChannelCategory,
	): Promise<Packed<'ChannelCategory'>> {
		return {
            id: src.id,
			name: src.name,
            description: src.description,
            iconName: src.iconName,
            forGame: src.forGame,
        };
	},

	packMany(
		ChannelCategories: ChannelCategory[],
	) {
		return Promise.all(ChannelCategories.map(x => this.pack(x)));
	},
});
