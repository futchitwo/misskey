export const packedChannelSubCategorySchema = {
    type: 'object',
	properties: {
		id: {
			type: 'string',
			optional: false, nullable: false,
			format: 'id',
			example: 'xxxxxxxxxx',
		},/*
		createdAt: {
			type: 'string',
			optional: false, nullable: false,
			format: 'date-time',
		},*/
		name: {
			type: 'string',
			optional: false, nullable: false,
		},
        description: {
			type: 'string',
			optional: false, nullable: true,
		},
        categoryId: {
			type: 'string',
			optional: false, nullable: true,
			format: 'id',
			example: 'xxxxxxxxxx',
		},
        category: {
            type: 'object',
            optional: false, nullable: true,
            ref: 'ChannelCategory',
        },
        iconUrl: {
			type: 'string',
			optional: false, nullable: true,
		},
        siteUrl: {
			type: 'string',
			optional: true, nullable: true,
		},
        appStoreId: {
			type: 'string',
			optional: true, nullable: true,
		},
        googlePlayId: {
			type: 'string',
			optional: true, nullable: true,
		},
        steamId: {
			type: 'string',
			optional: true, nullable: true,
		},
        epicStoreId: {
			type: 'string',
			optional: true, nullable: true,
		},
	},
} as const;