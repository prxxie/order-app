import { MicroservicesModule } from '@app/microservices';
import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';

@Module({
  imports: [MicroservicesModule],
  controllers: [OrderController],
})
export class ApiGatewayModule {}
