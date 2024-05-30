import { ICategory } from './category.interface'
import { IDiscipline } from './discipline.interface'
import { ISpeciality } from './speciality.interface'

export interface IBook {
	id: number
	author: string
	slug: string
	title: string
	createdAt: string
	category: ICategory
	discipline: IDiscipline
	speciality: ISpeciality
}

export interface IBookDetails {
	user: IBook
}

export type TypeBooks = {
	books: IBook[]
}

export type TypePaginationBooks = {
	length: number
	books: IBook[]
}
