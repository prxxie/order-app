import {
  ORDER__CANCEL_ORDER,
  ORDER__CREATE_ORDER,
  ORDER__GET_DETAIL_ORDER,
  ORDER__UPDATE_PAYMENT,
} from '@app/microservices/registry/order-service.const';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from '../services/order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern(ORDER__CREATE_ORDER)
  createOrder() {
    return this.orderService.createOrder();
  }

  @MessagePattern(ORDER__UPDATE_PAYMENT)
  updatePayment(payload) {
    return this.orderService.updatePayment(
      payload.paymentResult,
      payload.orderId,
    );
  }

  @MessagePattern(ORDER__GET_DETAIL_ORDER)
  getOrderDetail(id: number) {
    return this.orderService.getOrderDetail(id);
  }

  @MessagePattern(ORDER__CANCEL_ORDER)
  cancelOrder(id: number) {
    return this.orderService.cancelOrder(id);
  }

  // updateDelivery(result: boolean): void {}
}
