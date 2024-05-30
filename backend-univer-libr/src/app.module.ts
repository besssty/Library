import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { CategoryModule } from './category/category.module'
import { DisciplineModule } from './discipline/discipline.module'
import { OrderModule } from './order/order.module'
import { PaginationModule } from './pagination/pagination.module'
import { SpecialityModule } from './speciality/speciality.module'
import { StatisticsModule } from './statistics/statistics.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		BookModule,
		CategoryModule,
		SpecialityModule,
		DisciplineModule,
		OrderModule,
		StatisticsModule,
		PaginationModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
