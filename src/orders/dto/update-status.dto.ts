import { IsEnum } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order-status.enum";

export class UpdateStatusDto {
  @IsEnum(OrderStatusList, {
    message: `Status must be one of ${OrderStatusList.join(', ')}`
  })
  status: OrderStatus
}