'use client'

import { getAdminUrl } from '@/config/url.config'
import { SpecialityService } from '@/services/speciality.service'
import Heading from '@/ui/Heading'
import AdminList from '@/ui/admin/admin-list/AdminList'
import { IListItem } from '@/ui/admin/admin-list/admin-list.interface'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const Specialities: FC = () => {
	const { data, isFetching } = useQuery(
		['get admin specialities'],
		() => SpecialityService.getAll(),
		{
			select: ({ data }) =>
				data.map((specialityService): IListItem => {
					return {
						id: specialityService.id,
						editUrl: getAdminUrl(`/specialities/edit/${specialityService.id}`),
						items: [specialityService.name, specialityService.slug]
					}
				})
		}
	)

	return (
		<>
			<Heading className='mb-7'>Спеціальності</Heading>
			<AdminList isLoading={isFetching} listItems={data} />
		</>
	)
}

export default Specialities
