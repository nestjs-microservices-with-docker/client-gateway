import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TransportModule } from './transport/transport.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    TransportModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
