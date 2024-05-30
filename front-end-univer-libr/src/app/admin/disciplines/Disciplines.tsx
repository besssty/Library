'use client'

import { getAdminUrl } from '@/config/url.config'
import { DisciplineService } from '@/services/discipline.service'
import Heading from '@/ui/Heading'
import AdminList from '@/ui/admin/admin-list/AdminList'
import { IListItem } from '@/ui/admin/admin-list/admin-list.interface'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const Disciplines: FC = () => {
	const { data, isFetching } = useQuery(
		['get admin disciplines'],
		() => DisciplineService.getAll(),
		{
			select: ({ data }) =>
				data.map((disciplineService): IListItem => {
					return {
						id: disciplineService.id,
						editUrl: getAdminUrl(`/disciplines/edit/${disciplineService.id}`),
						items: [disciplineService.name, disciplineService.slug]
					}
				})
		}
	)

	return (
		<>
			<Heading className='mb-7'>Дисциплини</Heading>
			<AdminList isLoading={isFetching} listItems={data} />
		</>
	)
}

export default Disciplines
