import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesService } from './microservices.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_ORDER',
        transport: Transport.TCP,
        options: {
          host: process.env.SERVICE_ORDER_HOST || 'service-order',
          port: parseInt(process.env.SERVICE_ORDER_PORT) || 3000,
        },
      },
      {
        name: 'REDIS_TRANSMIT',
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [MicroservicesService],
  exports: [ClientsModule],
})
export class MicroservicesModule {}
