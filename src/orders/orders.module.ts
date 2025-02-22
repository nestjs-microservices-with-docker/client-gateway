import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '@config/services';
import { envs } from '@config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: envs.ordersMicroservicePort,
          host: envs.ordersMicroserviceHost
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
