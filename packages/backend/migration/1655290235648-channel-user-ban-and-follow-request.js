export class channelUserBanAndFollowRequest1655290235648 {
    name = 'channelUserBanAndFollowRequest1655290235648'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "channel_follow_request" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "followeeId" character varying(32) NOT NULL, "followerId" character varying(32) NOT NULL, CONSTRAINT "PK_1946cbea7196ec22c747c688880" PRIMARY KEY ("id")); COMMENT ON COLUMN "channel_follow_request"."createdAt" IS 'The created date of the FollowRequest.'; COMMENT ON COLUMN "channel_follow_request"."followeeId" IS 'The followee channel ID.'; COMMENT ON COLUMN "channel_follow_request"."followerId" IS 'The follower user ID.'`);
        await queryRunner.query(`CREATE INDEX "IDX_2dc1aff253c0bb25dbbe9f1499" ON "channel_follow_request" ("followeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d84a54e9f624e81d0eeb1984a0" ON "channel_follow_request" ("followerId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_302ae3bddb8c3c4b67308a055d" ON "channel_follow_request" ("followerId", "followeeId") `);
        await queryRunner.query(`CREATE TABLE "channel_banned_user" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "channelId" character varying(32) NOT NULL, "userId" character varying(32) NOT NULL, CONSTRAINT "PK_31d58a776cbff94dbd00dbc829e" PRIMARY KEY ("id")); COMMENT ON COLUMN "channel_banned_user"."createdAt" IS 'The created date of the Ban.'; COMMENT ON COLUMN "channel_banned_user"."channelId" IS 'The channel ID.'; COMMENT ON COLUMN "channel_banned_user"."userId" IS 'The user ID.'`);
        await queryRunner.query(`CREATE INDEX "IDX_8cc03a95e239727e829d354f6a" ON "channel_banned_user" ("channelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_54de746f46f9f7ee07fb9a16fd" ON "channel_banned_user" ("userId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1877e144e527e3af5d5ba3b96" ON "channel_banned_user" ("channelId", "userId") `);
        await queryRunner.query(`ALTER TABLE "channel" ADD "approvalOnly" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "channel"."approvalOnly" IS 'Whether the group is approval-only.'`);
        await queryRunner.query(`ALTER TABLE "channel_follow_request" ADD CONSTRAINT "FK_2dc1aff253c0bb25dbbe9f1499f" FOREIGN KEY ("followeeId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_follow_request" ADD CONSTRAINT "FK_d84a54e9f624e81d0eeb1984a09" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_banned_user" ADD CONSTRAINT "FK_8cc03a95e239727e829d354f6aa" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_banned_user" ADD CONSTRAINT "FK_54de746f46f9f7ee07fb9a16fd7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "channel_banned_user" DROP CONSTRAINT "FK_54de746f46f9f7ee07fb9a16fd7"`);
        await queryRunner.query(`ALTER TABLE "channel_banned_user" DROP CONSTRAINT "FK_8cc03a95e239727e829d354f6aa"`);
        await queryRunner.query(`ALTER TABLE "channel_follow_request" DROP CONSTRAINT "FK_d84a54e9f624e81d0eeb1984a09"`);
        await queryRunner.query(`ALTER TABLE "channel_follow_request" DROP CONSTRAINT "FK_2dc1aff253c0bb25dbbe9f1499f"`);
        await queryRunner.query(`COMMENT ON COLUMN "channel"."approvalOnly" IS 'Whether the group is approval-only.'`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "approvalOnly"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1877e144e527e3af5d5ba3b96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54de746f46f9f7ee07fb9a16fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8cc03a95e239727e829d354f6a"`);
        await queryRunner.query(`DROP TABLE "channel_banned_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_302ae3bddb8c3c4b67308a055d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d84a54e9f624e81d0eeb1984a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2dc1aff253c0bb25dbbe9f1499"`);
        await queryRunner.query(`DROP TABLE "channel_follow_request"`);
    }
}
