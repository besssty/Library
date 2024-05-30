import { IsString } from 'class-validator'

export class DisciplineDto {
	@IsString()
	name: string
}
