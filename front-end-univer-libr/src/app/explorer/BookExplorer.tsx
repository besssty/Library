'use client'
import { BookService } from '@/services/book/book.service'
import { TypePaginationBooks } from '@/types/book.interface'
import Heading from '@/ui/Heading'
import Catalog from '@/ui/catalog/Catalog'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Pagination from './pagination/Pagination'
import { useFilters } from './useFilters'

interface IBookExplorer {
	initialBooks: TypePaginationBooks
}

const BookExplorer: FC<IBookExplorer> = ({ initialBooks }) => {
	const { isFilterUpdated, queryParams, updateQueryParams } = useFilters()

	const { data, isFetching } = useQuery(
		['book explorer', queryParams],
		() => BookService.getAll(queryParams),
		{
			initialData: initialBooks
		}
	)

	return (
		<>
			<div className='flex items-center justify-between mb-7'>
				<Heading>
					{queryParams.searchTerm
						? `Пошук за запитом "${queryParams.searchTerm}"`
						: 'Пошук'}
				</Heading>
			</div>
			<div>
				<section>
					<Catalog books={data.books} isLoading={isFetching} />
					<Pagination
						changePage={page => updateQueryParams('page', page.toString())}
						currentPage={queryParams.page}
						numberPages={data.length / +queryParams.perPage}
					/>
				</section>
			</div>
		</>
	)
}

export default BookExplorer
