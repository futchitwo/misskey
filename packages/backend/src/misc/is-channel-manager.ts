import { ChannelSubLeaders } from '@/models/index.js';
import { Channel } from '@/models/entities/channel.js';

export async function isChannelManager(myId: string, channel?: Channel | null): Promise<boolean> {
	if (!channel) return false;
	
	const leader = channel.userId === myId;
	if (leader) return true;

	const isSubLeader = channel.subLeaderIds?.some(id => id === myId );
	return isSubLeader;
	/*
	const subLeader = await ChannelSubLeaders.findOneBy({
		channelId: channel.id,
		userId: myId,
	});
	return !!subLeader;
	*/
}
