import { Type } from 'class-transformer';
import { IsString, Min, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {

  @IsNumber()
  @IsPositive()
  id: number

  @IsString()
  name: string

  @IsNumber({
    maxDecimalPlaces: 2
  })
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  price: number
}
