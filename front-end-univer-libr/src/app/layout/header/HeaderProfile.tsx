'use client'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()
	const { isShow, ref, setIsShow } = useOutside(false)

	return (
		<div className='relative h-[45px]' ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				<Image
					width={45}
					height={45}
					src={'/images/avatar.svg'}
					alt='profile'
					className='rounded-full border-primary border border-solid animate-opacity'
				/>
			</button>
			{isShow && (
				<div
					className='absolute w-40 right-1 z-20'
					style={{ top: 'calc(100% + .4rem)' }}
				>
					<Link
						href='/my-orders'
						className='bg-white shadow py-2 px-4 block w-full rounded-md hover:text-primary duration-300 transition-colors'
					>
						Мої бронювання
					</Link>
				</div>
			)}
		</div>
	)
}

export default HeaderProfile
