import * as misskey from 'misskey-js';

export function isChannelManager(myId: string, channel?: misskey.models.channel | null): boolean {
	if (!channel) return false;
	
	const isLeader = channel.userId === myId;

	const isSubLeader = channel.subLeaderIds.some(id => id === myId );
	return isLeader || isSubLeader;
}
