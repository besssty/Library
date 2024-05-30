import { DisciplineService } from '@/services/discipline.service'
import { useQuery } from '@tanstack/react-query'

export const useDisciplines = () => {
	const { data, isLoading } = useQuery(
		['get disciplines'],
		() => DisciplineService.getAll(),
		{ select: ({ data }) => data }
	)

	return { data, isLoading }
}
