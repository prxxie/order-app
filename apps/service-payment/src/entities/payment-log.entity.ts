import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

export enum PaymentStatus {
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}

@Entity()
export class PaymentLogEntity extends BaseEntity<PaymentLogEntity, 'id'> {
  @PrimaryKey()
  id: number;

  @Property({ default: PaymentStatus.CONFIRMED })
  status!: PaymentStatus;

  @Property()
  orderId!: number;

  @Property()
  amount!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
