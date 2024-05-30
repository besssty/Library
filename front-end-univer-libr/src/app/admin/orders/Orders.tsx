'use client'

import Heading from '@/ui/Heading'
import AdminList from '@/ui/admin/admin-list/AdminList'
import { FC } from 'react'
import { useAdminOrders } from './useAdminOrders'

const Orders: FC = () => {
	const { data, isFetching } = useAdminOrders()

	return (
		<>
			<Heading className='mb-7'>Бронювання</Heading>
			<AdminList isLoading={isFetching} listItems={data} />
		</>
	)
}

export default Orders
