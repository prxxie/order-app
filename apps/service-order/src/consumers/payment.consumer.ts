import { ORDER__ORDER_CREATED_EVENT } from '@app/microservices/registry/order-service.const';
import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Job } from 'bull';
import { OrderEntity } from '../entities/order.entity';

@Processor({ name: 'payment-checking' })
export class PaymentConsumer {
  private readonly logger = new Logger(PaymentConsumer.name);

  constructor(@Inject('REDIS_TRANSMIT') private redisTransmit: ClientProxy) {}

  @Process({ concurrency: 10 })
  async paymentChecking({ data }: Job<OrderEntity>) {
    this.redisTransmit.emit(ORDER__ORDER_CREATED_EVENT, data);
  }
}
