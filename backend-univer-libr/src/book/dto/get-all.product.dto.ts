import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/pagination.dto'

export enum EnumBookSort {
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export class GetAllBookDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EnumBookSort)
	sort?: EnumBookSort

	@IsOptional()
	@IsString()
	searchTerm?: string

	@IsOptional()
	@IsString()
	categoryId?: string

	@IsOptional()
	@IsString()
	specialityId?: string

	@IsOptional()
	@IsString()
	disciplineId?: string
}
