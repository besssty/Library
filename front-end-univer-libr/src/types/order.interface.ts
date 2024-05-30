import { ICartItem } from './cart.interface'
import { IUser } from './user.interface'

export interface IOrder {
	id: number
	createdAt: string
	items: ICartItem[]
	user: IUser
}
