import { EntityRepository } from '@mikro-orm/core';
import { PaymentLogEntity } from '../entities/payment-log.entity';

export class PaymentLogRepository extends EntityRepository<PaymentLogEntity> {}
