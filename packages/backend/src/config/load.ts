/**
 * Config loader
 */

import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as yaml from 'js-yaml';
import { Source, Mixin } from './types';

//const _filename = fileURLToPath(import.meta.url);
const _filename = __filename;
const _dirname = dirname(_filename);

/**
 * Path of configuration directory
 */
const dir = `${_dirname}/../../../../.config`;

/**
 * Path of configuration file
 */
const path = process.env.NODE_ENV === 'test'
	? `${dir}/test.yml`
	: `${dir}/default.yml`;

export default function load() {
	const meta = JSON.parse(fs.readFileSync(`${_dirname}/../../../../built/meta.json`, 'utf-8'));
	const config = {
		url: process.env.CONFIG_URL,
		port:process.env.PORT,
		db: {
			host: process.env.DATABASE_HOST,
			db: process.env.DATABASE_DB,
			user: process.env.DATABASE_USER,
			pass: process.env.DATABASE_PASS,
			disableCache: true,
			extra: { max: process.env.DATABASE_MAX }
		},
		redis: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
			pass: process.env.REDIS_PASS
		},
		id: "aid",
		disableHsts: true,
		clusterLimit: 1
	}; //yaml.load(fs.readFileSync(path, 'utf-8')) as Source;

	const mixin = {} as Mixin;

	const url = tryCreateUrl(config.url);

	config.url = url.origin;

	config.port = config.port || parseInt(process.env.PORT || '', 10);

	mixin.version = meta.version;
	mixin.host = url.host;
	mixin.hostname = url.hostname;
	mixin.scheme = url.protocol.replace(/:$/, '');
	mixin.wsScheme = mixin.scheme.replace('http', 'ws');
	mixin.wsUrl = `${mixin.wsScheme}://${mixin.host}`;
	mixin.apiUrl = `${mixin.scheme}://${mixin.host}/api`;
	mixin.authUrl = `${mixin.scheme}://${mixin.host}/auth`;
	mixin.driveUrl = `${mixin.scheme}://${mixin.host}/files`;
	mixin.userAgent = `Misskey/${meta.version} (${config.url})`;

	if (!config.redis.prefix) config.redis.prefix = mixin.host;

	return Object.assign(config, mixin);
}

function tryCreateUrl(url: string) {
	try {
		return new URL(url);
	} catch (e) {
		throw `url="${url}" is not a valid URL.`;
	}
}
