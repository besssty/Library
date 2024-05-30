import { SpecialityService } from '@/services/speciality.service'
import { useQuery } from '@tanstack/react-query'

export const useSpecialities = () => {
	const { data, isLoading } = useQuery(
		['get specialities'],
		() => SpecialityService.getAll(),
		{ select: ({ data }) => data }
	)

	return { data, isLoading }
}
