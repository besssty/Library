import { axiosClassic, instance } from '@/api/api.interceptor'
import { IDiscipline } from '@/types/discipline.interface'

const DISCIPLINES = 'disciplines'

export const DisciplineService = {
	async getAll() {
		return axiosClassic<IDiscipline[]>({
			url: DISCIPLINES,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<IDiscipline[]>({
			url: `${DISCIPLINES}/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string | number) {
		return axiosClassic<IDiscipline>({
			url: `${DISCIPLINES}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async create() {
		return instance<IDiscipline>({
			url: DISCIPLINES,
			method: 'POST'
		})
	},

	async update(id: string | number, name: string) {
		return instance<IDiscipline>({
			url: `${DISCIPLINES}/${id}`,
			method: 'PUT',
			data: { name }
		})
	},

	async delete(id: string | number) {
		return instance<IDiscipline>({
			url: `${DISCIPLINES}/${id}`,
			method: 'DELETE'
		})
	}
}
