import { ORDER__UPDATE_PAYMENT } from '@app/microservices/registry/order-service.const';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDto } from '../dtos/order-dto.interface';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @Inject('SERVICE_ORDER') private readonly orderProxy: ClientProxy,
  ) {}

  paymentChecking(order: OrderDto) {
    const { amount, id } = order;

    const checkResult = amount < 500;

    // this.logger.log(`Payment ${checkResult ? 'SUCCESS' : 'FAILED'}`);

    return this.orderProxy.send(ORDER__UPDATE_PAYMENT, {
      paymentResult: checkResult,
      orderId: id,
    });
  }
}
