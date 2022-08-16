import { EntityRepository } from '@mikro-orm/core';
import { OrderEntity } from '../entities/order.entity';

export class OrderRepository extends EntityRepository<OrderEntity> {}
