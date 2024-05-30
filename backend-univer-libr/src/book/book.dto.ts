import { Prisma } from '@prisma/client'
import { IsNumber, IsString } from 'class-validator'

export class BookDto implements Prisma.BookUpdateInput {
	@IsString()
	author: string

	@IsString()
	title: string

	@IsNumber()
	categoryId: number

	@IsNumber()
	disciplineId: number

	@IsNumber()
	specialityId: number
}
