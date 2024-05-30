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
import { DisciplineDto } from './discipline.dto'
import { DisciplineService } from './discipline.service'

@Controller('disciplines')
export class DisciplineController {
	constructor(private readonly disciplineService: DisciplineService) {}

	@Get()
	async getAll() {
		return this.disciplineService.getAll()
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.disciplineService.bySlug(slug)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.disciplineService.byId(+id)
	}

	@HttpCode(200)
	@Auth('admin')
	@Post()
	async create() {
		return this.disciplineService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: DisciplineDto) {
		return this.disciplineService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth('admin')
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.disciplineService.delete(+id)
	}
}
