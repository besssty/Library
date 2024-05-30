import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Disciplines from './Specialities'

export const metadata = {
	title: 'Disciplines',
	...NO_INDEX_PAGE
}

export default function DisciplinesPage() {
	return <Disciplines />
}
