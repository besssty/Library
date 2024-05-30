export const BOOKS = 'books'

export type TypeBookData = {
	title: string
	author: string
	categoryId: number
	disciplineId: number
	specialityId: number
}

export type TypeBookDataFilters = {
	page?: string | number
	perPage: string | number
	sort?: EnumBookSort | string
	searchTerm?: string
	categoryId?: string
	disciplineId?: string
	specialityId?: string
}

export enum EnumBookSort {
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export type TypeParamsFilters = {
	searchParams: TypeBookDataFilters
}
