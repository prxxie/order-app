import { MicroservicesModule } from '@app/microservices';
import { Options } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentLogEntity } from './entities/payment-log.entity';
import { dbConnection } from './mikro-orm.config';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [
    MicroservicesModule,
    MikroOrmModule.forRoot({
      ...(dbConnection as Options),
      autoLoadEntities: true,
      debug: process.env.NODE_ENV === 'development',
    }),
    MikroOrmModule.forFeature([PaymentLogEntity]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class ServicePaymentModule {}
