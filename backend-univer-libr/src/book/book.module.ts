import { Module } from '@nestjs/common'
import { CategoryModule } from 'src/category/category.module'
import { DisciplineModule } from 'src/discipline/discipline.module'
import { PaginationModule } from 'src/pagination/pagination.module'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { SpecialityModule } from 'src/speciality/speciality.module'
import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
	controllers: [BookController],
	imports: [
		PaginationModule,
		CategoryModule,
		SpecialityModule,
		DisciplineModule
	],
	providers: [BookService, PrismaService, PaginationService]
})
export class BookModule {}
