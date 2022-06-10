import { db } from '@/db/postgre.js';
import { Channel } from '@/models/entities/channel.js';
import { Packed } from '@/misc/schema.js';
import { DriveFiles, ChannelFollowings, NoteUnreads, ChannelNotePinings, Notes, ChannelSubLeaders, Users } from '../index.js';
import { User } from '@/models/entities/user.js';

export const ChannelRepository = db.getRepository(Channel).extend({
	async pack(
		src: Channel['id'] | Channel,
		me?: { id: User['id'] } | null | undefined,
	): Promise<Packed<'Channel'>> {
		const channel = typeof src === 'object' ? src : await this.findOneByOrFail({ id: src });
		const meId = me ? me.id : null;

		const subLeaders = await ChannelSubLeaders.createQueryBuilder('subleader')
		.where('subleader.channelId = :channelId', { channelId: channel.id })
		.innerJoinAndSelect('subleader.user', 'user')
		.getMany();

		const banner = channel.bannerId ? await DriveFiles.findOneBy({ id: channel.bannerId }) : null;

		const hasUnreadNote = meId ? (await NoteUnreads.findOneBy({ noteChannelId: channel.id, userId: meId })) != null : undefined;

		const following = meId ? await ChannelFollowings.findOneBy({
			followerId: meId,
			followeeId: channel.id,
		}) : null;
		
		const pins = await ChannelNotePinings.createQueryBuilder('pin')
		.where('pin.channelId = :channelId', { channelId: channel.id })
		.innerJoinAndSelect('pin.note', 'note')
		.orderBy('pin.id', 'DESC')
		.getMany();

		return {
			id: channel.id,
			createdAt: channel.createdAt.toISOString(),
			lastNotedAt: channel.lastNotedAt ? channel.lastNotedAt.toISOString() : null,
			name: channel.name,
			description: channel.description,
			userId: channel.userId,
			subLeaderIds: subLeaders.map(sl => sl.userId),
			/*subLeaders: await Users.packMany(subLeaders.map(sl => sl.user!), me, {
				detail: true,
			}),*/
			bannerUrl: banner ? DriveFiles.getPublicUrl(banner, false) : null,
			usersCount: channel.usersCount,
			notesCount: channel.notesCount,
			pinnedNoteIds: pins.map(pin => pin.noteId),
			pinnedNotes: await Notes.packMany(pins.map(pin => pin.note!), me, {
				detail: true,
			}),

			...(me ? {
				isFollowing: following != null,
				hasUnreadNote,
			} : {}),
		};
	},
});
