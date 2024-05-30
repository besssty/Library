'use client'
import { useCategories } from '@/hooks/queries/useCategories'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'
import { useOutside } from '@/hooks/useOutside'
import Loader from '@/ui/Loader'
import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'
import Curricula from '../header/Curricula'
import { ADMIN_MENU } from './admin-menu.data'
import { convertToMenuItemsCategory } from './convert-to-menu-items'

const Sidebar: FC = () => {
	const { data, isLoading } = useCategories()
	const { user } = useAuth()
	const { logout } = useActions()
	const { isShow, setIsShow, ref } = useOutside(false)
	const { isAdminPanel, pathname } = useIsAdminPanel()

	return (
		<div>
			<aside
				className='bg-secondary flex flex-col flex-shrink-0 justify-between z-10'
				style={{ minHeight: 'calc(100vh - 90px)' }}
			>
				<div>
					{isLoading ? (
						<Loader />
					) : data ? (
						<>
							<button
								className='text-xl text-white text-center mt-4 mb-6 ml-6 hover:text-primary'
								onClick={() => {
									setIsShow(!isShow)
								}}
							>
								{isAdminPanel ? 'Меню 👈' : 'Категорії 👈'}
							</button>
							<div
								className={cn(
									'absolute top-[8rem] w-50  bg-secondary rounded-xl py-3 text-sm menu z-20 text-white shadow-sm border border-white border-solid',
									isShow ? 'open-menu' : 'close-menu'
								)}
							>
								<ul>
									{(isAdminPanel
										? ADMIN_MENU
										: convertToMenuItemsCategory(data)
									).map(item => (
										<li key={item.link}>
											<Link
												className={cn(
													'block text-lg mx-1 my-2 px-6 hover:text-primary transition-colors duration-200',
													pathname === item.link ? 'text-primary' : 'text-white'
												)}
												href={item.link}
											>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<Curricula />
						</>
					) : (
						<div>Категорії не знайдено!</div>
					)}
				</div>
				{!!user && (
					<button
						className='text-white flex items-center justify-center mb-5'
						onClick={() => logout()}
					>
						<span className='ml-2 mr-1'>Log-out</span>
						<FiLogOut />
					</button>
				)}
			</aside>
		</div>
	)
}

export default Sidebar
