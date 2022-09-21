import { DatabaseService } from '@app/database';
import { MicroservicesModule } from '@app/microservices';
import { Options } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentLogEntity } from './entities/payment-log.entity';
import { Migration20220921080919 } from './migrations/Migration20220921080919';
import { dbConnection } from './mikro-orm.config';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [
    MicroservicesModule,
    MikroOrmModule.forRoot({
      ...(dbConnection as Options),
      autoLoadEntities: true,
      debug: process.env.NODE_ENV === 'development',
      migrations: {
        migrationsList: [
          {
            name: 'Migration20220921080919.ts',
            class: Migration20220921080919,
          },
        ],
      },
    }),
    MikroOrmModule.forFeature([PaymentLogEntity]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, DatabaseService],
})
export class ServicePaymentModule {}
