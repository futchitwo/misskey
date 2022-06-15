import { PrimaryColumn, Entity, Index, Column } from 'typeorm';
import { id } from '../id.js';

@Entity()
export class ChannelCategory {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the category.',
	})
	public createdAt: Date;

    @Column('varchar', {
		length: 64,
	})
	public name: string;

	@Column('varchar', {
		length: 128, nullable: true,
	})
	public description: string | null;

    @Column('varchar', {
		length: 64, nullable: true,
	})
	public iconName: string | null;

    @Index()
	@Column('boolean', {
		default: false,
		comment: 'Whether the category is for games.',
	})
	public forGame: boolean;
}
