'use client'

import { IBook } from '@/types/book.interface'
import { FC } from 'react'
import Heading from '../Heading'
import Loader from '../Loader'
import BookItem from './book-item/BookItem'

interface ICatalog {
	books: IBook[]
	isLoading?: boolean
	title?: string
}

const Catalog: FC<ICatalog> = ({ books, isLoading, title }) => {
	if (isLoading) return <Loader />
	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}
			{books.length ? (
				<>
					<div className='grid grid-cols-4 gap-10'>
						{books.map(book => (
							<BookItem key={book.id} book={book} />
						))}
					</div>
				</>
			) : (
				<div>Немає жодної книжки</div>
			)}
		</section>
	)
}

export default Catalog
