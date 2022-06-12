import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.js';
import { id } from '../id.js';
import { Channel } from './channel.js';

@Entity()
@Index(['followerId', 'followeeId'], { unique: true })
export class ChannelBannedUser {
	@PrimaryColumn(id())
	public id: string;

	@Column('timestamp with time zone', {
		comment: 'The created date of the Ban.',
	})
	public createdAt: Date;

	@Index()
	@Column({
		...id(),
		comment: 'The channel ID.',
	})
	public channelId: Channel['id'];

	@ManyToOne(type => Channel, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public channel: Channel | null;

	@Index()
	@Column({
		...id(),
		comment: 'The user ID.',
	})
	public userId: User['id'];

	@ManyToOne(type => User, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public user: User | null;
}
