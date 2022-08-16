import { Migration } from '@mikro-orm/migrations';

export class Migration20220815085155 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "order" ("id" serial primary key, "status" varchar(255) not null default \'CREATED\', "user_id" int not null, "amount" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "order" cascade;');
  }
}
