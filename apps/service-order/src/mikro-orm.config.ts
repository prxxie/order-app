import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { LoadStrategy } from '@mikro-orm/core';

export const dbConnection: Options = {
  type: 'postgresql',
  host: process.env.DB_HOST || 'service-order-db',
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
};

const cliConfig = {
  ...dbConnection,
  entities: ['dist/apps/service-order/main.js'],
  entitiesTs: ['apps/service-order/src/entities/*.entity.ts'],
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: 'migrations',
    pathTs: 'apps/service-order/src/migrations/',
  },
};

export default cliConfig;
