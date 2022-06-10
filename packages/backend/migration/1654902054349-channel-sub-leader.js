export class channelSubLeader1654902054349 {
    name = 'channelSubLeader1654902054349'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "channel_sub_leader" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "channelId" character varying(32) NOT NULL, "userId" character varying(32) NOT NULL, CONSTRAINT "PK_b164e0915abba74c5102d50a3a0" PRIMARY KEY ("id")); COMMENT ON COLUMN "channel_sub_leader"."createdAt" IS 'The created date of the ChannelSubLeader.'; COMMENT ON COLUMN "channel_sub_leader"."channelId" IS 'The channel ID.'; COMMENT ON COLUMN "channel_sub_leader"."userId" IS 'The sub-leader user ID.'`);
        await queryRunner.query(`CREATE INDEX "IDX_f6cdd1ebc6b5d4a50821de5d58" ON "channel_sub_leader" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4477bd0efba8e9eb37d110cbe" ON "channel_sub_leader" ("channelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4fb6ea1732383b4608e43ff53e" ON "channel_sub_leader" ("userId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5777f4f2cb6285efc6404d5c9b" ON "channel_sub_leader" ("channelId", "userId") `);
        await queryRunner.query(`ALTER TABLE "channel_sub_leader" ADD CONSTRAINT "FK_a4477bd0efba8e9eb37d110cbea" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_sub_leader" ADD CONSTRAINT "FK_4fb6ea1732383b4608e43ff53e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "channel_sub_leader" DROP CONSTRAINT "FK_4fb6ea1732383b4608e43ff53e6"`);
        await queryRunner.query(`ALTER TABLE "channel_sub_leader" DROP CONSTRAINT "FK_a4477bd0efba8e9eb37d110cbea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5777f4f2cb6285efc6404d5c9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fb6ea1732383b4608e43ff53e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4477bd0efba8e9eb37d110cbe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6cdd1ebc6b5d4a50821de5d58"`);
        await queryRunner.query(`DROP TABLE "channel_sub_leader"`);
    }
}
