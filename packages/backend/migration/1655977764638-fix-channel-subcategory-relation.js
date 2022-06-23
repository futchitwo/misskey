export class fixChannelSubcategoryRelation1655977764638 {
    name = 'fixChannelSubcategoryRelation1655977764638'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_27919473389126e223d92a34e33"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_27919473389126e223d92a34e33" FOREIGN KEY ("subCategoryId") REFERENCES "channel_sub_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_27919473389126e223d92a34e33"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_27919473389126e223d92a34e33" FOREIGN KEY ("subCategoryId") REFERENCES "channel"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
}
