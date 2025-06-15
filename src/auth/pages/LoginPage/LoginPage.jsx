import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '@/hooks';
import { LayoutAuth } from '@/auth/Layouts/LayoutAuth/LayoutAuth';
import { Link } from 'react-router-dom';

const loginForm = {
	email: '',
	password: '',
};

export const LoginPage = () => {
	const { startLogin, errorMessage } = useAuthStore();
	const { loginEmail, loginPassword, onInputChange } = useForm(loginForm);

	const loginSubmit = e => {
		e.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Error en la autenticación', errorMessage, 'error');
		}
	}, [errorMessage]);

	return (
		<LayoutAuth title='Iniciar sesión'>
			<form
				onSubmit={loginSubmit}
				className='w-full max-w-md mx-auto space-y-6'
			>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						name='loginEmail'
						value={loginEmail || ''}
						onChange={onInputChange}
						required
						className='mt-1 w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
						placeholder='example@google.es'
					/>
				</div>

				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Contraseña
					</label>
					<input
						id='password'
						type='password'
						name='loginPassword'
						value={loginPassword || ''}
						onChange={onInputChange}
						required
						className='mt-1 w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
						placeholder='Enter your password...'
					/>
				</div>

				<div className='flex items-center justify-center'>
					<button
						type='submit'
						className='w-72 bg-sky-600 text-white py-2.5 rounded-md text-base font-medium hover:bg-sky-700 transition'
					>
						Iniciar sesión
					</button>
				</div>
			</form>

			<div className='mt-6 text-center text-sm text-gray-600'>
				<Link to='/auth/register-admin' className='hover:underline'>
					Crear cuenta de administrador
				</Link>
			</div>
		</LayoutAuth>
	);
};
