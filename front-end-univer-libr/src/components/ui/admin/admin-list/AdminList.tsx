import Loader from '@/ui/Loader'
import { FC } from 'react'
import styles from './AdminList.module.scss'
import AdminListItem from './AdminListItem'
import { IListItem } from './admin-list.interface'

interface IAdminList {
	listItems?: IListItem[]
	isLoading: boolean

	removeHandler?: (id: number) => void
}

const AdminList: FC<IAdminList> = ({
	isLoading,
	removeHandler,
	listItems = []
}) => {
	return (
		<div className={styles.div}>
			{isLoading ? (
				<Loader />
			) : listItems.length ? (
				listItems.map(listItem => (
					<AdminListItem
						key={listItem.id}
						removeHandler={
							removeHandler ? () => removeHandler(listItem.id) : undefined
						}
						listItem={listItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Елементи не знайдено</div>
			)}
		</div>
	)
}

export default AdminList
