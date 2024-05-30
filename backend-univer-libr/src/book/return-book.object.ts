import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/return-category.object'
import { returnDisciplineObject } from 'src/discipline/return-discipline.object'
import { returnSpecialityObject } from 'src/speciality/return-speciality.object'

export const returnBookObject: Prisma.BookSelect = {
	id: true,
	author: true,
	title: true,
	createdAt: true,
	slug: true,
	category: { select: returnCategoryObject },
	discipline: { select: returnDisciplineObject },
	speciality: { select: returnSpecialityObject }
}

export const returnBookObjectFullest: Prisma.BookSelect = {
	...returnBookObject
}
