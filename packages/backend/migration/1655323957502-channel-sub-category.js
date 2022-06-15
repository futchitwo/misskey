export class channelSubCategory1655323957502 {
    name = 'channelSubCategory1655323957502'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "channel_sub_category" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "name" character varying(128) NOT NULL, "description" character varying(256), "category" character varying(64) NOT NULL, "lastActivityAt" TIMESTAMP WITH TIME ZONE, "appStoreId" character varying(64), "googlePlayId" character varying(256), "steamId" character varying(64), "epicStoreId" character varying(256), "siteUrl" character varying(256), "iconUrl" character varying(256), "channelsCount" smallint NOT NULL DEFAULT '0', CONSTRAINT "PK_89b0c449f50040371963748fec0" PRIMARY KEY ("id")); COMMENT ON COLUMN "channel_sub_category"."createdAt" IS 'The created date of the sub-category.'; COMMENT ON COLUMN "channel_sub_category"."lastActivityAt" IS 'The last activity date of the sub-category.'`);
        await queryRunner.query(`CREATE INDEX "IDX_c32fe8efd9fbc510db310012f4" ON "channel_sub_category" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_2569c9a769c418bd5e346fff19" ON "channel_sub_category" ("category") `);
        await queryRunner.query(`CREATE INDEX "IDX_7afaa02941a600ba16dc73d94b" ON "channel_sub_category" ("lastActivityAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_d117392ae51aaa89d39b029bd1" ON "channel_sub_category" ("appStoreId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d907952b232b77932c4421adb5" ON "channel_sub_category" ("googlePlayId") `);
        await queryRunner.query(`CREATE INDEX "IDX_04552044db64bea74433520b87" ON "channel_sub_category" ("steamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1226ee248e0b2d77c763cbbcd" ON "channel_sub_category" ("epicStoreId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4e3db3d95eca40dda4b6880ed" ON "channel_sub_category" ("siteUrl") `);
        await queryRunner.query(`ALTER TABLE "channel" ADD "subCategoryId" character varying(32)`);
        await queryRunner.query(`COMMENT ON COLUMN "channel"."subCategoryId" IS 'The sub category ID.'`);
        await queryRunner.query(`CREATE INDEX "IDX_27919473389126e223d92a34e3" ON "channel" ("subCategoryId") `);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_27919473389126e223d92a34e33" FOREIGN KEY ("subCategoryId") REFERENCES "channel"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_27919473389126e223d92a34e33"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27919473389126e223d92a34e3"`);
        await queryRunner.query(`COMMENT ON COLUMN "channel"."subCategoryId" IS 'The sub category ID.'`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "subCategoryId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4e3db3d95eca40dda4b6880ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1226ee248e0b2d77c763cbbcd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04552044db64bea74433520b87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d907952b232b77932c4421adb5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d117392ae51aaa89d39b029bd1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7afaa02941a600ba16dc73d94b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2569c9a769c418bd5e346fff19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c32fe8efd9fbc510db310012f4"`);
        await queryRunner.query(`DROP TABLE "channel_sub_category"`);
    }
}
