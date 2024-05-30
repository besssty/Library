import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { DisciplineDto } from './discipline.dto'
import { returnDisciplineObject } from './return-discipline.object'

@Injectable()
export class DisciplineService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const discipline = await this.prisma.discipline.findUnique({
			where: { id },
			select: returnDisciplineObject
		})

		if (!discipline) {
			throw new Error('Discipline not found')
		}

		return discipline
	}

	async bySlug(slug: string) {
		const discipline = await this.prisma.discipline.findUnique({
			where: { slug },
			select: returnDisciplineObject
		})

		if (!discipline) {
			throw new NotFoundException('Discipline not found')
		}

		return discipline
	}

	async create() {
		return this.prisma.discipline.create({ data: { name: '', slug: '' } })
	}

	async getAll() {
		return this.prisma.discipline.findMany({ select: returnDisciplineObject })
	}

	async update(id: number, dto: DisciplineDto) {
		return this.prisma.discipline.update({
			where: { id },
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
	}

	async delete(id: number) {
		return this.prisma.discipline.delete({
			where: { id }
		})
	}
}
