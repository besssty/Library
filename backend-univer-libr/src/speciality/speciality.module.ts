import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SpecialityController } from './speciality.controller'
import { SpecialityService } from './speciality.service'

@Module({
	controllers: [SpecialityController],
	providers: [SpecialityService, PrismaService],
	exports: [SpecialityService]
})
export class SpecialityModule {}
