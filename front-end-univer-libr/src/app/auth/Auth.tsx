'use client'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { IEmailPassword } from '@/store/user/user.interface'
import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const { login, register } = useActions()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === 'login') login(data)
		else register(data)

		reset()
	}

	return (
		<>
			<section className='flex' style={{ minHeight: 'calc(100vh - 90px)' }}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='rounded-lg bg-white shadow-sm p-8 m-auto'
				>
					<Heading className='capitalize text-center mb-4'>{type}</Heading>
					{isLoading ? (
						<Loader />
					) : (
						<>
							{type === 'register' ? (
								<Field
									{...formRegister('name', {
										required: "Прізвище обовя'зкове"
									})}
									placeholder='Прізвище та ініціали'
									error={errors.name?.message}
								/>
							) : null}
							{type === 'register' ? (
								<Field
									{...formRegister('phone', {
										required: "Телефон обовя'зковий"
									})}
									placeholder='Телефон'
									error={errors.phone?.message}
								/>
							) : null}
							<Field
								{...formRegister('email', {
									required: "Електронна пошта обовя'зкова",
									pattern: {
										value: validEmail,
										message: 'Будь ласка, введіть дійсну електронну адресу'
									}
								})}
								placeholder='Емейл'
								error={errors.email?.message}
							/>
							<Field
								{...formRegister('password', {
									required: 'Потрібно ввести пароль',
									minLength: {
										value: 6,
										message:
											'Мінімальна довжина не повинна перевищувати 6 символів'
									}
								})}
								type='password'
								placeholder='Пароль'
								error={errors.password?.message}
							/>
							<Button type='submit' className='m-auto block' variant='orange'>
								Lets go!
							</Button>{' '}
							<div>
								<button
									type='button'
									className='inline-block opacity-50 mt-3 text-sm'
									onClick={() =>
										setType(type === 'login' ? 'register' : 'login')
									}
								>
									{type === 'login' ? 'Register' : 'Login'}
								</button>
							</div>
						</>
					)}
				</form>
			</section>
		</>
	)
}

export default Auth
