import Heading from '@/ui/Heading'
import Link from 'next/link'

export default function NotFound() {
	return (
		<>
			<Heading>Не знайдено</Heading>
			<p>Не вдалося знайти запитуваний ресурс</p>
			<p>
				Дивитися{' '}
				<Link href={'/explorer'} className='text-primary'>
					всі книги
				</Link>
			</p>
		</>
	)
}
