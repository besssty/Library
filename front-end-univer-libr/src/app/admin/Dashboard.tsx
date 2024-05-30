'use client'

import { StatisticsService } from '@/services/statistics/statistics.service'
import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import styles from './Dashboard.module.scss'
import AddBook from './add-book/AddBook'

const Dashboard: FC = () => {
	const { data, isFetching } = useQuery(
		['statistics'],
		() => StatisticsService.getMain(),
		{
			select: ({ data }) => data
		}
	)

	return (
		<>
			<Heading className='mb-8'>Дошка статистики</Heading>
			{isFetching ? (
				<Loader />
			) : data?.length ? (
				<>
					<div className={styles.wrapper}>
						{data.map((item, index) => (
							<div key={item.name} className={styles.item}>
								<div>{item.name}</div>
								<div>{item.value}</div>
								<div>{index === data.length - 1}</div>
							</div>
						))}
					</div>
					<div className='mt-6 flex items-start justify-start'>
						<AddBook />
					</div>
				</>
			) : (
				<div>Статистику не завантажено!</div>
			)}
		</>
	)
}

export default Dashboard
