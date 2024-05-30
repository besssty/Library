import { Prisma } from '@prisma/client'

export const returnDisciplineObject: Prisma.DisciplineSelect = {
	id: true,
	name: true,
	slug: true
}
