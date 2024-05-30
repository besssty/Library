import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Orders from '../orders/Orders'

export const metadata = {
	title: 'Order',
	...NO_INDEX_PAGE
}

export default function OrderPage() {
	return <Orders />
}
