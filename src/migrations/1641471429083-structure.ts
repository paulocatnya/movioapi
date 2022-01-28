import { MigrationInterface, QueryRunner } from 'typeorm';

export class structure1641471429083 implements MigrationInterface {
  name = 'structure1641471429083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "moviment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "type" "public"."moviment_type_enum" NOT NULL, "description" character varying NOT NULL, "value" numeric NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_1963c07623168d51c5dfad5ba7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "moviment" ADD CONSTRAINT "FK_0fe01d7fa87eee4bd120ab0cbeb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "moviment" DROP CONSTRAINT "FK_0fe01d7fa87eee4bd120ab0cbeb"`,
    );
    await queryRunner.query(`DROP TABLE "moviment"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
