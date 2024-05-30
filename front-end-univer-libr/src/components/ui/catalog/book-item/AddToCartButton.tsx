import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IBook } from '@/types/book.interface'
import { FC } from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

const AddToCartButton: FC<{ book: IBook }> = ({ book }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		(cartItem: { book: { id: number } }) => cartItem.book.id === book.id
	)

	return (
		<div>
			<button
				className='text-secondary'
				onClick={() =>
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({ book, quantity: 1 })
				}
			>
				{currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
			</button>
		</div>
	)
}

export default AddToCartButton
