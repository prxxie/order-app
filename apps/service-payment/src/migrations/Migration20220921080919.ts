import { Migration } from '@mikro-orm/migrations';

export class Migration20220921080919 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "payment_log_entity" ("id" serial primary key, "status" varchar(255) not null default \'CONFIRMED\', "order_id" int not null, "amount" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "payment_log_entity" cascade;');
  }
}
