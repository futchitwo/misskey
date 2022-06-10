import { Channel } from "@/models/entities/channel";

export function isChannelManager(myId: string, channel?: Channel | null): boolean {
	if (!channel) return false;
	return channel.userId === myId;
}
