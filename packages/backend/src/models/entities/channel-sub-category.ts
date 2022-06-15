import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { id } from '../id.js';

@Entity()
export class ChannelSubCategory {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the sub-category.',
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
	@Column('varchar', {
		length: 64,
	})
	public category: string;

  @Index()
	@Column('timestamp with time zone', {
		nullable: true,
		comment: 'The last activity date of the sub-category.',
	})
	public lastActivityAt: Date;

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

	@Column('smallint', {
		default: 0,
	})
	public channelsCount: number;
}
