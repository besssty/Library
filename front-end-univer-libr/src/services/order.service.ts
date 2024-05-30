import { instance } from '@/api/api.interceptor'
import { IOrder } from '@/types/order.interface'

const ORDERS = 'orders'

type TypeData = {
	items: { bookId: number; quantity: number }[]
}

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: ORDERS,
			method: 'GET'
		})
	},

	async getByUserId() {
		return instance<IOrder[]>({
			url: `${ORDERS}/by-user`,
			method: 'GET'
		})
	},

	async placeOrder(data: TypeData) {
		return instance({
			url: ORDERS,
			method: 'POST',
			data
		})
	}
}
