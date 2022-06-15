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
        category: {
			type: 'string',
			optional: false, nullable: false,
		},
        lastActivityAt: {
			type: 'string',
			optional: false, nullable: true,
			format: 'date-time',
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
        channelsCount: {
            type: 'number',
            optional: false, nullable: false,
        }
	},
} as const;
