'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { RiDeleteRow, RiEdit2Line } from 'react-icons/ri'
import { IListItem } from '../admin-list.interface'
import styles from './Admin.actions.module.scss'

interface IAdminActions extends Pick<IListItem, 'editUrl'> {
	removeHandler?: () => void
}

const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()

	return (
		<div className={styles.actions}>
			{editUrl && (
				<button onClick={() => push(editUrl)}>
					<RiEdit2Line />
				</button>
			)}
			{removeHandler && (
				<button onClick={removeHandler}>
					<RiDeleteRow />
				</button>
			)}
		</div>
	)
}

export default AdminActions
