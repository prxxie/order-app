import { MikroORM } from '@mikro-orm/core';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'production') await this.autoMigrateDB();
  }

  async autoMigrateDB() {
    const migrator = this.orm.getMigrator();
    await migrator.up();
    console.log(migrator);
  }
}
