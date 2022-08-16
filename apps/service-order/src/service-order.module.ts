import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module, Scope } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { dbConnection } from './mikro-orm.config';
import { Options } from '@mikro-orm/core';
import { OrderController } from './controllers/order.controller';
import { MicroservicesModule } from '@app/microservices';
import { OrderService } from './services/order.service';
import { OrderSubscriber } from './subscribers/order.subscriber';
import { BullModule } from '@nestjs/bull';
import { PaymentConsumer } from './consumers/payment.consumer';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    MicroservicesModule,
    MikroOrmModule.forRoot({
      ...(dbConnection as Options),
      autoLoadEntities: true,
      debug: process.env.NODE_ENV === 'development',
      logger: logger.log.bind(logger),
      // subscribers: [new OrderEntitySubscriber()],
      allowGlobalContext: true,
      pool: {
        min: 10,
        max: 20,
      },
    }),
    MikroOrmModule.forFeature([OrderEntity]),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'payment-checking',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderSubscriber, PaymentConsumer],
})
export class ServiceOrderModule {}
