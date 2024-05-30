import { ICartItem } from '@/types/cart.interface'
import { FC } from 'react'
import styles from '../Cart.module.scss'
import CartActions from './cart-actions/CartActions'

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	return (
		<div className={styles.item}>
			<div className={styles.item}>
				{item.book.title + '-' + item.book.author}
			</div>
			<CartActions item={item} />
		</div>
	)
}

export default CartItem
