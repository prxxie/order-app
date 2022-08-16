import {
  ORDER__CANCEL_ORDER,
  ORDER__CREATE_ORDER,
  ORDER__GET_DETAIL_ORDER,
} from '@app/microservices/registry/order-service.const';
import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(@Inject('SERVICE_ORDER') private orderProxy: ClientProxy) {}

  @Post()
  createOrder() {
    return this.orderProxy.send(ORDER__CREATE_ORDER, true);
  }

  @Get(':id')
  getOrderDetail(@Param('id') id: number) {
    return this.orderProxy.send(ORDER__GET_DETAIL_ORDER, id);
  }

  @Post(':id/cancel')
  cancelOrder(@Param('id') id: number) {
    return this.orderProxy.send(ORDER__CANCEL_ORDER, id);
  }
}
