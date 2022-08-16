import { ORDER__ORDER_CREATED_EVENT } from '@app/microservices/registry/order-service.const';
import {
  ChangeSetType,
  EntityManager,
  EntityName,
  EventArgs,
  EventSubscriber,
  FlushEventArgs,
} from '@mikro-orm/core';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bull';
import { OrderEntity, OrderStatus } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderSubscriber implements EventSubscriber<OrderEntity> {
  private readonly logger = new Logger(OrderSubscriber.name);

  constructor(
    private readonly em: EntityManager,
    @Inject('REDIS_TRANSMIT') private redisTransmit: ClientProxy,
    @InjectQueue('payment-checking') private paymentCheckingQueue: Queue,
    private readonly orderRepo: OrderRepository,
  ) {
    em.getEventManager().registerSubscriber(this);
  }

  getSubscribedEntities(): EntityName<OrderEntity>[] {
    return [OrderEntity];
  }

  async afterCreate(args: EventArgs<OrderEntity>): Promise<void> {
    const { entity } = args;
    // this.redisTransmit.emit(ORDER__ORDER_CREATED_EVENT, entity);
  }

  async afterFlush(args: FlushEventArgs): Promise<void> {
    const changeSets = args.uow.getChangeSets();

    Promise.all(
      changeSets.map(async ({ entity, type }) => {
        if (entity instanceof OrderEntity && type === ChangeSetType.CREATE) {
          // this.logger.log(`Order ${entity.id} created`);
          await this.paymentCheckingQueue.add(entity);
        }

        if (
          entity instanceof OrderEntity &&
          type === ChangeSetType.UPDATE &&
          entity.status === OrderStatus.CONFIRMED
        ) {
          const order = await this.orderRepo.findOne(entity.id);

          order.assign({ status: OrderStatus.DELIVERED });

          setTimeout(async () => {
            await this.orderRepo.flush();
            this.logger.log(`Order ${entity.id} DELIVERED`);
          }, 10000);
        }
      }),
    );
  }
}
