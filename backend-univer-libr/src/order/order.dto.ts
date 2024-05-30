import { Type } from 'class-transformer'
import { IsArray, IsNumber, ValidateNested } from 'class-validator'

export class OrderDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
}

export class OrderItemDto {
	@IsNumber()
	quantity: number

	@IsNumber()
	bookId: number
}
