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
		<LayoutAuth title='Login'>
			<form
				onSubmit={loginSubmit}
				className='w-full max-w-sm mx-auto space-y-8'
			>
				<div>
					<label
						htmlFor='email'
						className='block text-base font-medium text-gray-700'
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
						className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
						placeholder='example@google.es'
					/>
				</div>

				<div>
					<label
						htmlFor='password'
						className='block text-base font-medium text-gray-700'
					>
						Password
					</label>
					<input
						id='password'
						type='password'
						name='loginPassword'
						value={loginPassword || ''}
						onChange={onInputChange}
						required
						className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
						placeholder='Enter your password...'
					/>
				</div>

				<div>
					<button
						type='submit'
						className='w-full bg-sky-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-sky-700 transition'
					>
						Login
					</button>
				</div>
			</form>

			<div className='mt-8 text-center text-base text-gray-600'>
				{/* <Link to='/auth/register-user' className='block hover:underline'>
					Create user account
				</Link> */}
				<Link
					to='/auth/register-admin'
					className='block hover:underline'
				>
					Create admin account
				</Link>
				{/* <Link to='/auth/forgot-password' className='block hover:underline'>
					Forgot your password?
				</Link> */}
			</div>
		</LayoutAuth>
	);
};
