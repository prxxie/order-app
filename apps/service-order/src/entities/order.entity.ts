import {
  AfterCreate,
  BaseEntity,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { OrderRepository } from '../repositories/order.repository';

export enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  DELIVERED = 'DELIVERED',
}

@Entity({ tableName: 'order', customRepository: () => OrderRepository })
export class OrderEntity extends BaseEntity<OrderEntity, 'id'> {
  [EntityRepositoryType]?: OrderRepository;

  @PrimaryKey()
  id: number;

  @Property({ default: OrderStatus.CREATED })
  status!: OrderStatus;

  @Property()
  userId!: number;

  @Property()
  amount!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
