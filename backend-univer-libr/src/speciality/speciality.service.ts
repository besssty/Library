import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { returnSpecialityObject } from './return-speciality.object'
import { SpecialityDto } from './speciality.dto'

@Injectable()
export class SpecialityService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const speciality = await this.prisma.speciality.findUnique({
			where: { id },
			select: returnSpecialityObject
		})

		if (!speciality) {
			throw new Error('Speciality not found')
		}

		return speciality
	}

	async bySlug(slug: string) {
		const speciality = await this.prisma.speciality.findUnique({
			where: { slug },
			select: returnSpecialityObject
		})

		if (!speciality) {
			throw new NotFoundException('Speciality not found')
		}

		return speciality
	}

	async create() {
		return this.prisma.speciality.create({ data: { name: '', slug: '' } })
	}

	async getAll() {
		return this.prisma.speciality.findMany({ select: returnSpecialityObject })
	}

	async update(id: number, dto: SpecialityDto) {
		return this.prisma.speciality.update({
			where: { id },
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
	}

	async delete(id: number) {
		return this.prisma.speciality.delete({
			where: { id }
		})
	}
}
