'use client'

import { getAdminUrl } from '@/config/url.config'
import { OrderService } from '@/services/order.service'
import { IListItem } from '@/ui/admin/admin-list/admin-list.interface'
import { formatDate } from '@/utils/format-date'
import { useQuery } from '@tanstack/react-query'

export const useAdminOrders = () => {
	const { data, isFetching, refetch } = useQuery(
		['get admin orders'],
		() => OrderService.getAll(),
		{
			select: ({ data }) =>
				data.map((order): IListItem => {
					return {
						id: order.id,
						editUrl: getAdminUrl(`/orders/edit/${order.id}`),
						items: [
							`# ${order.id}`,
							formatDate(order.createdAt),
							`${order.items.map(item => ' Автор: ' + item.book.author + ' Назва: ' + item.book.title)}`
						]
					}
				})
		}
	)

	return {
		data,
		isFetching
	}
}
