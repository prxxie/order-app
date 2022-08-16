import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { Util } from 'libs/common/src/util';
import { OrderEntity, OrderStatus } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  async createOrder() {
    const newOrder = new OrderEntity();
    newOrder.assign({ userId: 1, amount: Util.getRandomArbitrary(0, 999) });
    // return newOrder;

    await this.orderRepo.persistAndFlush(newOrder);

    return newOrder;
  }

  @UseRequestContext()
  async updatePayment(paymentResult: boolean, orderId: number) {
    this.logger.log(
      `Order ${orderId} payment ${paymentResult ? 'SUCCESS' : 'FAILED'}`,
    );
    const order = await this.orderRepo.findOne(orderId);

    if (paymentResult) {
      order.assign({ status: OrderStatus.CONFIRMED });
    } else {
      order.assign({ status: OrderStatus.CANCELED });
    }

    this.orderRepo.flush();
  }

  async getOrderDetail(id: number): Promise<OrderEntity> {
    return await this.orderRepo.findOne(id);
  }

  async cancelOrder(id: number): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne(id);

    order.assign({ status: OrderStatus.CANCELED });
    this.orderRepo.flush();

    return order;
  }
}
