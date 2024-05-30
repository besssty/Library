'use client'

import { OrderService } from '@/services/order.service'
import Heading from '@/ui/Heading'
import { useQuery } from '@tanstack/react-query'

interface IMyOrders {}

export default function MyOrders({}: IMyOrders) {
	const { data: orders } = useQuery(
		['my orders'],
		() => OrderService.getByUserId(),
		{
			select: ({ data }) => data
		}
	)

	return (
		<>
			<Heading>Мої бронювання</Heading>

			<section>
				{orders?.length ? (
					orders.map(order => (
						<div
							key={order.id}
							className='bg-white shadow flex gap-10 p-7 my-7 rounded-lg'
						>
							<span>#{order.id}</span>
							<span>{new Date(order.createdAt).toLocaleString()}</span>
							<span>
								{order.items.map(
									item => ' ' + item.book.author + ' - ' + item.book.title + ';'
								)}
							</span>
						</div>
					))
				) : (
					<div>Бронювань не знайдено</div>
				)}
			</section>
		</>
	)
}
