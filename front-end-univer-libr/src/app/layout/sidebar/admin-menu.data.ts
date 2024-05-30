import { getAdminUrl } from '@/config/url.config'
import { IMenuItem } from './menu.interface'

export const ADMIN_MENU: IMenuItem[] = [
	{
		label: 'Дошка статистики',
		link: getAdminUrl('/')
	},
	{
		label: 'Книги',
		link: getAdminUrl('/books')
	},
	{
		label: 'Категорії',
		link: getAdminUrl('/categories')
	},
	{
		label: 'Дисциплини',
		link: getAdminUrl('/disciplines')
	},
	{
		label: 'Спеціальності',
		link: getAdminUrl('/specialities')
	},
	{
		label: 'Бронювання',
		link: getAdminUrl('/orders')
	}
]
