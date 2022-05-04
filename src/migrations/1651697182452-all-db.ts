import {MigrationInterface, QueryRunner} from "typeorm";

export class allDb1651697182452 implements MigrationInterface {
    name = 'allDb1651697182452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "moviment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "type" character varying NOT NULL, "description" character varying NOT NULL, "value" numeric NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_1963c07623168d51c5dfad5ba7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "moviment" ADD CONSTRAINT "FK_4db1d435d2f2c30f500f250d95a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moviment" DROP CONSTRAINT "FK_4db1d435d2f2c30f500f250d95a"`);
        await queryRunner.query(`DROP TABLE "moviment"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
