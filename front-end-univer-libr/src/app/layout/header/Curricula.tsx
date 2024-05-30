'use client'
import { useOutside } from '@/hooks/useOutside'
import cn from 'clsx'
import { FC } from 'react'

const Curricula: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	return (
		<>
			<button
				className='text-base text-white text-center mt-4 mb-6 ml-6 hover:text-primary'
				onClick={() => {
					setIsShow(!isShow)
				}}
			>
				Навчальні плани 👈
			</button>
			<div
				className={cn(
					'absolute top-[12rem] w-45  bg-secondary rounded-xl px-1 py-1 text-sm menu z-20 text-white shadow-sm border border-white border-solid',
					isShow ? 'open-menu' : 'close-menu'
				)}
			>
				<ul>
					<li>
						<a
							className='block text-base my-3 px-10 hover:text-primary transition-colors duration-200'
							href='https://docs.google.com/spreadsheets/d/1LWpD7txHm93FG-ZYtq8icHxg4UEXHlLg/edit#gid=975484442'
							target='_blank'
						>
							Денна форма
						</a>
					</li>
					<li>
						<a
							className='block text-base my-3 px-10 hover:text-primary transition-colors duration-200'
							href='https://docs.google.com/spreadsheets/d/1g0dtzMQ18DdN95KmNHjJqBbORK9EDegJ/edit#gid=513784517'
							target='_blank'
						>
							Заочна форма
						</a>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Curricula
