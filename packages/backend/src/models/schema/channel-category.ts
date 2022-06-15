export const packedChannelCategorySchema = {
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
        iconName: {
			type: 'string',
			optional: false, nullable: true,
		},
        forGame: {
			type: 'boolean',
			optional: false, nullable: false,
		},
	},
} as const;