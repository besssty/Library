'use client'

import { BookService } from '@/services/book/book.service'
import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAddBook } from './add-book.interface'

const AddBook: FC = () => {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IAddBook>({
		mode: 'onChange'
	})

	const { mutate, isSuccess, isError, isLoading } = useMutation(
		['create book'],
		(data: IAddBook) => BookService.create(data),
		{
			onSuccess() {
				console.log('created')
			}
		}
	)

	const onSubmit: SubmitHandler<IAddBook> = data => {
		mutate(data)
		reset()
	}

	if (isSuccess)
		return (
			<div className='grid'>
				<div className='mb-4'>✅ Книгу успішно додано!</div>
				<a href='http://localhost:3000/admin' className='hover:text-primary'>
					Додати ще 🔄
				</a>
			</div>
		)
	if (isError)
		return (
			<div className='grid'>
				<div className='mb-4'>❌ Error! Книгу не додано!</div>
				<a href='http://localhost:3000/admin' className='hover:text-primary'>
					Спробувати заново 🔄
				</a>
			</div>
		)

	return (
		<>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='rounded-lg bg-white shadow-sm p-8 m-auto'
				>
					<Heading className='capitalize text-lg text-center mb-4'>
						Додати книгу
					</Heading>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<div className='grid' style={{ gridTemplateColumns: '1fr 1fr' }}>
								<Field
									className='mr-3'
									{...formRegister('author', {
										required: "Автор обовя'зковий"
									})}
									placeholder='Автор'
									error={errors.author?.message}
								/>
								<Field
									{...formRegister('title', {
										required: "Назва обовя'зкова"
									})}
									placeholder='Назва'
									error={errors.author?.message}
								/>
								<Field
									className='mr-3'
									{...formRegister('categoryId', {
										valueAsNumber: true,
										required: "Категорія обовя'зкова"
									})}
									placeholder='Айді категорії'
									error={errors.author?.message}
								/>
								<Field
									{...formRegister('specialityId', {
										valueAsNumber: true,
										required: "Спеціальність обовя'зкова"
									})}
									placeholder='Айді спеціальності'
									error={errors.author?.message}
								/>

								<Field
									className='mr-3'
									{...formRegister('disciplineId', {
										valueAsNumber: true,
										required: "Дисципліна обовя'зкова"
									})}
									placeholder='Айді дисциплини'
									error={errors.author?.message}
								/>
							</div>

							<Button type='submit' className='m-auto block' variant='orange'>
								Додати книгу!
							</Button>
						</>
					)}
				</form>
			</div>
		</>
	)
}

export default AddBook
