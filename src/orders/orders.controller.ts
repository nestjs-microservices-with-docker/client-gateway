import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ORDERS_SERVICE } from '@config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrdersPaginatinDto, UpdateStatusDto } from './dto';
import { UuidValidationPipe } from '@common/pipes';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_SERVICE) private readonly client: ClientProxy) {}
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order'}, createOrderDto)
  }

  @Get()
  findAll(@Query() ordersPaginatinDto: OrdersPaginatinDto) {
    return this.client.send({ cmd: 'find_all_orders'}, ordersPaginatinDto)
  }

  @Get(':id')
  async findOne(@Param('id', UuidValidationPipe) id: string) {
    try {
      
      const order = await firstValueFrom(this.client.send({ cmd: 'find_one_order'}, { id }))
      return order
    } catch (error) {
      throw new RpcException(error)
    }
  }
  @Patch(':id/status')
  async updateStatus(@Param('id', UuidValidationPipe) id: string, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      const order = await firstValueFrom(this.client.send({ cmd: 'update_order_status'}, { id, status: updateStatusDto.status }))
      return order
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
