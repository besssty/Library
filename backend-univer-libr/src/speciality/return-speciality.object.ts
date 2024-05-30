import { Prisma } from '@prisma/client'

export const returnSpecialityObject: Prisma.SpecialitySelect = {
	id: true,
	name: true,
	slug: true
}
