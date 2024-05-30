import { FC } from 'react'
import styles from './AdminList.module.scss'
import AdminActions from './admin-actions/AdminActions'
import { IAdminListItem } from './admin-list.interface'

const AdminListItem: FC<IAdminListItem> = ({ removeHandler, listItem }) => {
	return (
		<div
			className={styles.item}
			style={{ gridTemplateColumns: '1fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr' }}
		>
			{`Айді: ${listItem.id}`}
			{listItem.items.map(value => (
				<div key={value}>{value}</div>
			))}

			<AdminActions editUrl={listItem.editUrl} removeHandler={removeHandler} />
		</div>
	)
}

export default AdminListItem
