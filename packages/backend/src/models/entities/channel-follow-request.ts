import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.js';
import { id } from '../id.js';
import { Channel } from './channel.js';

@Entity()
@Index(['followerId', 'followeeId'], { unique: true })
export class ChannelFollowRequest {
	@PrimaryColumn(id())
	public id: string;

	@Column('timestamp with time zone', {
		comment: 'The created date of the FollowRequest.',
	})
	public createdAt: Date;

	@Index()
	@Column({
		...id(),
		comment: 'The followee channel ID.',
	})
	public followeeId: Channel['id'];

	@ManyToOne(type => Channel, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public followee: Channel | null;

	@Index()
	@Column({
		...id(),
		comment: 'The follower user ID.',
	})
	public followerId: User['id'];

	@ManyToOne(type => User, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public follower: User | null;
}
