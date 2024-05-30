import { axiosClassic, instance } from '@/api/api.interceptor'
import { ISpeciality } from '@/types/speciality.interface'

const SPECIALITIES = 'specialities'

export const SpecialityService = {
	async getAll() {
		return axiosClassic<ISpeciality[]>({
			url: SPECIALITIES,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<ISpeciality[]>({
			url: `${SPECIALITIES}/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string | number) {
		return axiosClassic<ISpeciality>({
			url: `${SPECIALITIES}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async create() {
		return instance<ISpeciality>({
			url: SPECIALITIES,
			method: 'POST'
		})
	},

	async update(id: string | number, name: string) {
		return instance<ISpeciality>({
			url: `${SPECIALITIES}/${id}`,
			method: 'PUT',
			data: { name }
		})
	},

	async delete(id: string | number) {
		return instance<ISpeciality>({
			url: `${SPECIALITIES}/${id}`,
			method: 'DELETE'
		})
	}
}
