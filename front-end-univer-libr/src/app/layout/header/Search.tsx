import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const { push } = useRouter()

	return (
		<div className='text-black flex'>
			<div
				className='border rounded overflow-hidden flex'
				style={{ gridTemplateColumns: '1fr 0.1fr' }}
			>
				<input
					type='text'
					className='bg-white text-sm py-2 px-4 text-black outline-none'
					value={searchTerm}
					placeholder='Шукати...'
					onChange={e => setSearchTerm(e.target.value)}
				/>

				<button
					className='flex items-center justify-center p-2.5 bg-primary text-white'
					onClick={() => {
						push(`/explorer?searchTerm=${searchTerm}`)
					}}
				>
					<BsSearch />
				</button>
			</div>
		</div>
	)
}

export default Search
