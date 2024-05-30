import { IBook } from '@/types/book.interface'
import { FC } from 'react'
import AddToCartButton from './AddToCartButton'

const BookItem: FC<{ book: IBook }> = ({ book }) => {
	return (
		<div className='animate-scaleIn'>
			<div className='bg-white rounded-xl relative overflow-hidden'>
				<div>
					<div className='absolute top-8 right-2 z-10'>
						<AddToCartButton book={book} />
					</div>
				</div>
				<div className='m-3'>
					<a className='grid' href={`/explorer?searchTerm=${book.title}`}>
						<h3 className='font-semibold justify-center items-center'>
							Назва:
						</h3>
						<h3 className='font-medium'>{book.title}</h3>
						<h3 className='font-semibold'>Автор:</h3>
						<h3 className='mb-2 font-medium'>{book.author}</h3>
					</a>
					<div className='flex mt-1 mb-2'>
						<a
							href={`/explorer?categoryId=${book.category.id}`}
							className='text-aqua text-xs mr-2'
						>
							{book.category.name}
						</a>
						<a
							href={`/explorer?specialityId=${book.speciality.id}`}
							className='text-aqua text-xs mr-2'
						>
							{book.speciality.name}
						</a>
						<a
							href={`/explorer?disciplineId=${book.discipline.id}`}
							className='text-aqua text-xs mr-2'
						>
							{book.discipline.name}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookItem
