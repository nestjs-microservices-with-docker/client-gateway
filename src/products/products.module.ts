import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TransportModule } from 'src/transport/transport.module';

@Module({
  controllers: [
    ProductsController,
  ],
  imports: [TransportModule],
  providers: [],
})
export class ProductsModule {
}
