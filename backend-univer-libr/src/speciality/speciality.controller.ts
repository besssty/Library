import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SpecialityDto } from './speciality.dto'
import { SpecialityService } from './speciality.service'

@Controller('specialities')
export class SpecialityController {
	constructor(private readonly specialityService: SpecialityService) {}

	@Get()
	async getAll() {
		return this.specialityService.getAll()
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.specialityService.bySlug(slug)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.specialityService.byId(+id)
	}

	@HttpCode(200)
	@Auth('admin')
	@Post()
	async create() {
		return this.specialityService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: SpecialityDto) {
		return this.specialityService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth('admin')
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.specialityService.delete(+id)
	}
}
