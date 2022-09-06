import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ServiceOrderModule } from './service-order.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServiceOrderModule,
    {
      transport: Transport.TCP,
      options: {
        host: '::',
      },
    },
  );

  await app.listen();
}
bootstrap();
