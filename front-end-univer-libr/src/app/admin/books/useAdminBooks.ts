'use client'

import { getAdminUrl } from '@/config/url.config'
import { BookService } from '@/services/book/book.service'
import { IListItem } from '@/ui/admin/admin-list/admin-list.interface'
import { formatDate } from '@/utils/format-date'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAdminBooks = () => {
	const { data, isFetching, refetch } = useQuery(
		['get admin books'],
		() => BookService.getAll(),
		{
			select: data =>
				data.books.map((book): IListItem => {
					return {
						id: book.id,
						editUrl: getAdminUrl(`/books/edit/${book.id}`),
						items: [
							book.title,
							book.author,
							book.category.name,
							book.discipline.name,
							book.speciality.name,
							formatDate(book.createdAt)
						]
					}
				})
		}
	)

	const { mutate } = useMutation(
		['delete book'],
		(id: number) => BookService.delete(id),
		{
			onSuccess() {
				refetch()
			}
		}
	)

	return {
		mutate,
		data,
		isFetching
	}
}
