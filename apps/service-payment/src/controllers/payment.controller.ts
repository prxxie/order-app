import { ORDER__ORDER_CREATED_EVENT } from '@app/microservices/registry/order-service.const';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrderDto } from '../dtos/order-dto.interface';
import { PaymentService } from '../services/payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern(ORDER__ORDER_CREATED_EVENT)
  paymentChecking(payload: OrderDto) {
    return this.paymentService.paymentChecking(payload);
  }
}
