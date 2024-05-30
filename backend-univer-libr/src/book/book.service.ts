import { Injectable, NotFoundException } from '@nestjs/common'
import { Book, Prisma } from '@prisma/client'
import { CategoryService } from 'src/category/category.service'
import { DisciplineService } from 'src/discipline/discipline.service'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { SpecialityService } from 'src/speciality/speciality.service'
import { generateSlug } from 'src/utils/generate-slug'
import { BookDto } from './book.dto'
import { EnumBookSort, GetAllBookDto } from './dto/get-all.product.dto'
import { returnBookObject, returnBookObjectFullest } from './return-book.object'

@Injectable()
export class BookService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService,
		private categoryService: CategoryService,
		private disciplineService: DisciplineService,
		private specialityService: SpecialityService
	) {}

	async getAll(dto: GetAllBookDto = {}) {
		const { perPage, skip } = this.paginationService.getPaginatio(dto)

		const filters = this.createFilter(dto)

		const books = await this.prisma.book.findMany({
			where: filters,
			orderBy: this.getSortOption(dto.sort),
			skip,
			take: perPage,
			select: returnBookObject
		})

		return {
			books,
			length: await this.prisma.book.count({ where: filters })
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.BookWhereInput {
		return {
			OR: [
				{
					category: {
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				},
				{
					discipline: {
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				},
				{
					speciality: {
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				},
				{
					author: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					title: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			]
		}
	}

	private createFilter(dto: GetAllBookDto): Prisma.BookWhereInput {
		const filters: Prisma.BookWhereInput[] = []

		if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))

		if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId))

		if (dto.specialityId)
			filters.push(this.getSpecialityFilter(+dto.specialityId))

		if (dto.disciplineId)
			filters.push(this.getDisciplineFilter(+dto.disciplineId))

		return filters.length ? { AND: filters } : {}
	}

	private getSortOption(
		sort: EnumBookSort
	): Prisma.BookOrderByWithRelationInput[] {
		switch (sort) {
			case EnumBookSort.OLDEST:
				return [{ createdAt: 'asc' }]
			default:
				return [{ createdAt: 'desc' }]
		}
	}

	private getCategoryFilter(categoryId): Prisma.BookWhereInput {
		return {
			categoryId
		}
	}

	private getSpecialityFilter(specialityId): Prisma.BookWhereInput {
		return {
			specialityId
		}
	}

	private getDisciplineFilter(disciplineId): Prisma.BookWhereInput {
		return {
			disciplineId
		}
	}

	async byId(id: number) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: returnBookObjectFullest
		})

		if (!book) {
			throw new NotFoundException('Book not found')
		}

		return book
	}

	async bySlug(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug },
			select: returnBookObjectFullest
		})

		if (!book) {
			throw new NotFoundException('Book not found')
		}

		return book
	}

	async byCategory(categorySlug: string) {
		const books = await this.prisma.book.findMany({
			where: { category: { slug: categorySlug } },
			select: returnBookObjectFullest
		})

		if (!books) {
			throw new NotFoundException('Category not found')
		}

		return books
	}

	async byDiscipline(disciplineSlug: string) {
		const books = await this.prisma.book.findMany({
			where: { discipline: { slug: disciplineSlug } },
			select: returnBookObjectFullest
		})

		if (!books) {
			throw new NotFoundException('Discipline not found')
		}

		return books
	}

	async bySpeciality(specialitySlug: string) {
		const books = await this.prisma.book.findMany({
			where: { speciality: { slug: specialitySlug } },
			select: returnBookObjectFullest
		})

		if (!books) {
			throw new NotFoundException('Speciality not found')
		}

		return books
	}

	async getSimilar(id: number) {
		const currentBook = await this.byId(id)

		if (!currentBook) {
			throw new NotFoundException('Current book not found!')
		}

		const books = await this.prisma.book.findMany({
			where: {
				category: { name: currentBook.category.name },
				discipline: { name: currentBook.discipline.name },
				speciality: { name: currentBook.speciality.name },
				NOT: { id: currentBook.id }
			},
			orderBy: { createdAt: 'desc' },
			select: returnBookObjectFullest
		})

		return books
	}

	async create(dto: BookDto) {
		const book = await this.prisma.book.create({
			data: {
				author: dto.author,
				title: dto.title,
				slug: generateSlug(dto.title),
				specialityId: dto.specialityId,
				categoryId: dto.categoryId,
				disciplineId: dto.disciplineId
			}
		})

		return { book: this.returnBookFields(book) }
	}

	private returnBookFields(book: Partial<Book>) {
		return {
			title: book.title,
			author: book.author,
			categoryId: book.categoryId,
			disciplineId: book.disciplineId,
			specialityId: book.specialityId
		}
	}

	async update(id: number, dto: BookDto) {
		const { author, title, categoryId, specialityId, disciplineId } = dto

		await this.categoryService.byId(categoryId)
		await this.specialityService.byId(specialityId)
		await this.disciplineService.byId(disciplineId)

		return this.prisma.book.update({
			where: { id },
			data: {
				author,
				title,
				slug: generateSlug(dto.author),
				category: { connect: { id: categoryId } },
				speciality: { connect: { id: specialityId } },
				discipline: { connect: { id: disciplineId } }
			}
		})
	}

	async delete(id: number) {
		return this.prisma.book.delete({
			where: { id }
		})
	}

	async getBook(id: number) {
		return this.prisma.book.findUnique({
			where: { id }
		})
	}
}
