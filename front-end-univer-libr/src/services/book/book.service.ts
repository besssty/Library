import { axiosClassic, instance } from '@/api/api.interceptor'
import { IBook, TypePaginationBooks } from '@/types/book.interface'
import { BOOKS, TypeBookData, TypeBookDataFilters } from './book.types'
import { IAddBook } from '@/app/admin/add-book/add-book.interface'

export const BookService = {
	async getAll(queryData = {} as TypeBookDataFilters) {
		const { data } = await axiosClassic<TypePaginationBooks>({
			url: BOOKS,
			method: 'GET',
			params: queryData
		})
		return data
	},

	async getSimilar(id: string | number) {
		return axiosClassic<IBook[]>({
			url: `${BOOKS}/similar/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		const { data } = await axiosClassic<IBook>({
			url: `${BOOKS}/by-slug/${slug}`,
			method: 'GET'
		})

		return data
	},

	async getByCategory(categorySlug: string) {
		return axiosClassic<IBook[]>({
			url: `${BOOKS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getBySpeciality(specialitySlug: string) {
		return axiosClassic<IBook[]>({
			url: `${BOOKS}/by-speciality/${specialitySlug}`,
			method: 'GET'
		})
	},

	async getByDiscipline(disciplineSlug: string) {
		return axiosClassic<IBook[]>({
			url: `${BOOKS}/by-discipline/${disciplineSlug}`,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<IBook>({
			url: `${BOOKS}/${id}`,
			method: 'GET'
		})
	},

	async create(data: IAddBook) {
		return instance({
			url: BOOKS,
			method: 'POST',
			data
		})
	},

	async update(id: string | number, data: TypeBookData) {
		return instance<IBook>({
			url: `${BOOKS}/${id}`,
			method: 'PUT',
			data
		})
	},

	async delete(id: string | number) {
		return instance<IBook>({
			url: `${BOOKS}/${id}`,
			method: 'DELETE'
		})
	}
}
