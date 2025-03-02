import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { NATS_SERVICE, PRODUCTS_SERVICE } from '@config/index';
import { PaginationDto } from '@common/dto';
import { IdValidationPipe } from '@common/pipes';
import { UpdateProductDto } from './dto/update-product.dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}


  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product'}, createProductDto)
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'findAll_products'}, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id', IdValidationPipe) id: string) {
    try {
      return firstValueFrom(this.client.send({ cmd: 'findOne_product'}, { id }))
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    // return this.client.send({ cmd: 'update_product'}, { id, ...updateProductDto })
    try {
      return firstValueFrom(this.client.send({ cmd: 'update_product'}, { id, ...updateProductDto }))
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id/status')
  updateStatus(@Param('id', IdValidationPipe) id: string) {
    return this.client.send({ cmd: 'update_product_status'}, { id })
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.client.send({ cmd: 'remove_product'}, { id })
  }
}
