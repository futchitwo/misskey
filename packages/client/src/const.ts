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
		'ja-JP': 'ゲーム: アクション',
	}, {
		category: 'game_puzzle',
		isGame: true,
		'ja-JP': 'ゲーム: パズル',
	}, {
		category: 'game_RPG',
		isGame: true,
		'ja-JP': 'ゲーム: ロールプレイング',
	}, {
		category: 'game_strategy',
		isGame: true,
		'ja-JP': 'ゲーム: ストラテジー',
	}, {
		category: 'game_music',
		isGame: true,
		'ja-JP': 'ゲーム: ミュージック',
	}, {
		category: 'game_simulation',
		isGame: true,
		'ja-JP': 'ゲーム: シミュレーション',
	}, {
		category: 'game_arcade',
		isGame: true,
		'ja-JP': 'ゲーム: アーケード',
	}, {
		category: 'game_sport',
		isGame: true,
		'ja-JP': 'ゲーム: スポーツ',
	}, {
		category: 'game_adventure',
		isGame: true,
		'ja-JP': 'ゲーム: アドベンチャー',
	}, {
		category: 'game_card',
		isGame: true,
		'ja-JP': 'ゲーム: カード',
	}, {
		category: 'game_casual',
		isGame: true,
		'ja-JP': 'ゲーム: カジュアル',
	}, {
		category: 'game_race',
		isGame: true,
		'ja-JP': 'ゲーム: レース',
	}, {
		category: 'game_casino',
		isGame: true,
		'ja-JP': 'ゲーム: カジノ',
	}, {
		category: 'game_board',
		isGame: true,
		'ja-JP': 'ゲーム: ボード',
	}, {
		category: 'game_education',
		isGame: true,
		'ja-JP': 'ゲーム: 教育',
	}, {
		category: 'game_family',
		isGame: true,
		'ja-JP': 'ゲーム: ファミリー',
	}, {
		category: 'game_widget',
		isGame: true,
		'ja-JP': 'ゲーム: ウィジェット',
	}, {
		category: 'game_word',
		isGame: true,
		'ja-JP': 'ゲーム: 言葉',
	}, {
		category: 'game_trivia',
		isGame: true,
		'ja-JP': 'ゲーム: 雑学',
	}, {
		category: 'talk',
		isGame: false,
		'ja-JP': '雑談',
	}, {
		category: 'animeManga',
		isGame: false,
		'ja-JP': 'アニメ・マンガ',
	}, {
		category: 'picture',
		isGame: false,
		'ja-JP': '画像・写真',
	}, {
		category: 'news',
		isGame: false,
		'ja-JP': 'ニュース',
	}, {
		category: 'movieDrama',
		isGame: false,
		'ja-JP': '映画・ドラマ',
	}, {
		category: 'sport',
		isGame: false,
		'ja-JP': 'スポーツ',
	}, {
		category: 'music',
		isGame: false,
		'ja-JP': '音楽',
	}, {
		category: 'entertainment',
		isGame: false,
		'ja-JP': 'エンターテイメント',
	}, {
		category: 'internet',
		isGame: false,
		'ja-JP': 'インターネット',
	}, {
		category: 'others',
		isGame: false,
		'ja-JP': 'その他',
	}, {
		category: 'hq',
		isGame: false,
		'ja-JP': '運営',
	}, 
];
