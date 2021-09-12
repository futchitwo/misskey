const config = require('./built/config').default;
const entities = require('./built/db/postgre').entities;

module.exports = {
	type: 'mysql',
	host: config.db.host,
	port: config.db.port,
	username: config.db.user,
	password: config.db.pass,
	database: config.db.db,
	extra: config.db.extra,
	entities: entities,
	migrations: ['migration/*.ts'],
	cli: {
		migrationsDir: 'migration'
	},
	connectTimeout: 10 * 60 * 10000,
	acquireTimeout: 10 * 60 * 10000
};
