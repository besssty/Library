import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { BookDto } from './book.dto'
import { BookService } from './book.service'
import { GetAllBookDto } from './dto/get-all.product.dto'

@Controller('books')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllBookDto) {
		return this.bookService.getAll(queryDto)
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.bookService.getSimilar(+id)
	}

	@Get('by-slug/:slug')
	async getBookBySlug(@Param('slug') slug: string) {
		return this.bookService.bySlug(slug)
	}

	@Get('by-category/:categorySlug')
	async getBookByCategory(@Param('categorySlug') categorySlug: string) {
		return this.bookService.byCategory(categorySlug)
	}

	@Get('by-discipline/:disciplineSlug')
	async getBookByDiscipline(@Param('disciplineSlug') disciplineSlug: string) {
		return this.bookService.byDiscipline(disciplineSlug)
	}

	@Get('by-speciality/:specialitySlug')
	async getBookBySpeciality(@Param('specialitySlug') specialitySlug: string) {
		return this.bookService.bySpeciality(specialitySlug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	async createBook(@Body() dto: BookDto) {
		return this.bookService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth('admin')
	async updateBook(@Param('id') id: string, @Body() dto: BookDto) {
		return this.bookService.update(+id, dto)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth('admin')
	async deleteBook(@Param('id') id: string) {
		return this.bookService.delete(+id)
	}

	@Put(':id')
	@Auth('admin')
	async getBook(@Param('id') id: string) {
		return this.bookService.getBook(+id)
	}
}
