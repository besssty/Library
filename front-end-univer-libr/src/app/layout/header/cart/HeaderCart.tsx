'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'
import { OrderService } from '@/services/order.service'
import Button from '@/ui/button/Button'
import SquareButton from '@/ui/button/SquareButton'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import styles from '../cart/Cart.module.scss'
import CartItem from './cart-item/CartItem'

const HeaderCart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { items } = useCart()
	const { push } = useRouter()
	const { reset } = useActions()

	const { mutate } = useMutation(
		['create order'],
		() =>
			OrderService.placeOrder({
				items: items.map(item => ({
					quantity: item.quantity,
					bookId: item.book.id
				}))
			}),
		{
			onSuccess() {
				reset()
				push('http://localhost:3000/thanks')
			},
			onError() {
				console.log('error')
			}
		}
	)

	return (
		<div className='relative' ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => {
					setIsShow(!isShow)
				}}
				number={items.length}
			/>
			<div
				className={cn(
					'absolute top-[3rem] w-60 -left-[9.5rem] bg-secondary rounded-xl px-5 py-3 text-sm menu z-20 text-white border border-solid border-white shadow-sm',
					isShow ? 'open-menu' : 'close-menu'
				)}
			>
				<div className='font-normal text-lg mb-5'>Мій кошик</div>
				<div className={styles.cart}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className='font-light'>Кошик порожній!</div>
					)}
					<div className='text-center'>
						<Button
							onClick={() => mutate()}
							variant='white'
							size='sm'
							className='btn-link mt-5 mb-2'
						>
							Забронювати
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeaderCart
