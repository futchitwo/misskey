export const MAX_NOTE_TEXT_LENGTH = 1000;

export const USER_ONLINE_THRESHOLD = 1000 * 60 * 10; // 10min
export const USER_ACTIVE_THRESHOLD = 1000 * 60 * 60 * 24 * 3; // 3days

// ブラウザで直接表示することを許可するファイルの種類のリスト
// ここに含まれないものは application/octet-stream としてレスポンスされる
// SVGはXSSを生むので許可しない
export const FILE_TYPE_BROWSERSAFE = [
	// Images
	'image/png',
	'image/gif',
	'image/jpeg',
	'image/webp',
	'image/apng',
	'image/bmp',
	'image/tiff',
	'image/x-icon',

	// OggS
	'audio/opus',
	'video/ogg',
	'audio/ogg',
	'application/ogg',

	// ISO/IEC base media file format
	'video/quicktime',
	'video/mp4',
	'audio/mp4',
	'video/x-m4v',
	'audio/x-m4a',
	'video/3gpp',
	'video/3gpp2',

	'video/mpeg',
	'audio/mpeg',

	'video/webm',
	'audio/webm',

	'audio/aac',
	'audio/x-flac',
	'audio/vnd.wave',
];
/*
https://github.com/sindresorhus/file-type/blob/main/supported.js
https://github.com/sindresorhus/file-type/blob/main/core.js
https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers
*/

export const CHANNEL_CATEGORIES = [
	{
		category: 'game_action',
		isGame: true,
	}, {
		category: 'game_puzzle',
		isGame: true,
	}, {
		category: 'game_RPG',
		isGame: true,
	}, {
		category: 'game_strategy',
		isGame: true,
	}, {
		category: 'game_music',
		isGame: true,
	}, {
		category: 'game_simulation',
		isGame: true,
	}, {
		category: 'game_arcade',
		isGame: true,
	}, {
		category: 'game_sport',
		isGame: true,
	}, {
		category: 'game_adventure',
		isGame: true,
	}, {
		category: 'game_card',
		isGame: true,
	}, {
		category: 'game_casual',
		isGame: true,
	}, {
		category: 'game_race',
		isGame: true,
	}, {
		category: 'game_casino',
		isGame: true,
	}, {
		category: 'game_board',
		isGame: true,
	}, {
		category: 'game_education',
		isGame: true,
	}, {
		category: 'game_family',
		isGame: true,
	}, {
		category: 'game_widget',
		isGame: true,
	}, {
		category: 'game_word',
		isGame: true,
	}, {
		category: 'game_trivia',
		isGame: true,
	}, {
		category: 'talk',
		isGame: false,
	}, {
		category: 'animeManga',
		isGame: false,
	}, {
		category: 'picture',
		isGame: false,
	}, {
		category: 'news',
		isGame: false,
	}, {
		category: 'movieDrama',
		isGame: false,
	}, {
		category: 'sport',
		isGame: false,
	}, {
		category: 'music',
		isGame: false,
	}, {
		category: 'entertainment',
		isGame: false,
	}, {
		category: 'others',
		isGame: false,
	}, 
];