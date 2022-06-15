import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { id } from '../id.js';
import { ChannelCategory } from './channel-category.js';

@Entity()
export class ChannelSubCategory {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the ChannelFollowing.',
	})
	public createdAt: Date;

    @Column('varchar', {
		length: 128,
	})
	public name: string;

	@Column('varchar', {
		length: 256, nullable: true,
	})
	public description: string | null;

	@Index()
	@Column({
		...id(),
        nullable: true,
		comment: 'The main category ID.',
	})
	public categoryId: ChannelCategory['id'] | null;

	@ManyToOne(type => Channel, {
		onDelete: 'SET NULL',//'CASCADE'?
	})
	@JoinColumn()
	public category: ChannelCategory | null;

    @Index()
    @Column('varchar', {
		length: 64, nullable: true,
	})
	public appStoreId: string | null;

    @Index()
    @Column('varchar', {
		length: 256, nullable: true,
	})
	public googlePlayId: string | null;

    @Index()
    @Column('varchar', {
		length: 64, nullable: true,
	})
	public steamId: string | null;

    @Index()
    @Column('varchar', {
		length: 256, nullable: true,
	})
	public epicStoreId: string | null;

    @Index()
    @Column('varchar', {
		length: 256, nullable: true,
	})
	public siteUrl: string | null;

    @Column('varchar', {
		length: 256, nullable: true,
	})
	public iconUrl: string | null;
}
