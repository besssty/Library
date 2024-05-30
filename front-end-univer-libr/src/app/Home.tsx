import { TypePaginationBooks } from '@/types/book.interface'
import Catalog from '@/ui/catalog/Catalog'
import { FC } from 'react'

const Home: FC<TypePaginationBooks> = ({ books }) => {
	return <Catalog title='Свіжі книги' books={books} />
}

export default Home
