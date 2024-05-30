'use client'
import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import HeaderProfile from './HeaderProfile'
import Search from './Search'
import HeaderCart from './cart/HeaderCart'

const Header: FC = () => {
	const { isAdminPanel } = useIsAdminPanel()
	const { user } = useAuth()

	return (
		<div
			className='bg-secondary w-full grid h-20'
			style={{ gridTemplateColumns: '.7fr 3fr 1.2fr' }}
		>
			<div className='flex items-center justify-center'>
				<Link href={'/'}>
					{isAdminPanel ? (
						<h2 className='text-3xl text-white font-semibold'>Admin Panel</h2>
					) : (
						<Image
							priority
							width={180}
							height={37}
							src={'/images/logo.svg'}
							alt='Library'
							className='align-middle flex justify-center'
						/>
					)}
				</Link>
			</div>
			<div className='flex items-center'>
				<Search />
			</div>
			<div className='flex items-center justify-end gap-10 mr-14'>
				{user?.isAdmin && !isAdminPanel && (
					<Link
						href='/admin'
						className='hover:text-primary transition-colors duration-200 text-white inline-block text-lg'
					>
						<MdOutlineAdminPanelSettings size={29} />
					</Link>
				)}
				<HeaderCart />
				{!!user && <HeaderProfile />}
				{!user && (
					<Link className='text-white' href={'/auth'}>
						Log-in
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
