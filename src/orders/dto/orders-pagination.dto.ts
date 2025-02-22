import { PaginationDto } from "@common/dto";
import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order-status.enum";

export class OrdersPaginatinDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Status must be one of ${OrderStatusList.join(', ')}`
  })
  status: OrderStatus
}