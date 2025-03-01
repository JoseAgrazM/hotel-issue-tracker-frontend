import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '@/hooks';
import { LayoutAuth } from '@/auth/Layouts/LayoutAuth/LayoutAuth';
import './loginPage.css';
import { Link } from 'react-router-dom';

const loginForm = {
	email: '',
	password: '',
};

export const LoginPage = () => {
	const { startLogin, errorMessage } = useAuthStore();

	const { loginEmail, loginPassword, onInputChange } = useForm(loginForm);

	const loginSubmit = event => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Error en la autenticación', errorMessage, 'error');
		}
	}, [errorMessage]);

	return (
		<LayoutAuth title='Login'>
			<form onSubmit={loginSubmit} className='form-container' action=''>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						className='form-input'
						id='email'
						type='email'
						name='loginEmail'
						value={loginEmail || ''}
						onChange={onInputChange}
						placeholder='example@google.es'
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						className='form-input'
						id='password'
						type='password'
						name='loginPassword'
						value={loginPassword || ''}
						onChange={onInputChange}
						placeholder='Enter your password...'
						required
					/>
				</div>
				<div className='form-group'>
					<input
						className='buttton-form-send'
						type='submit'
						value='Send'
					/>
				</div>
			</form>
			<div className='container-links-create'>
				{/* <Link to='/auth/register-user' className='links-auth-pages'>
					Create user account
				</Link> */}
				<Link to='/auth/register-admin' className='links-auth-pages '>
					Create admin account
				</Link>
				<Link to='/auth/forgot-password' className='links-auth-pages'>
					Forgot your password?
				</Link>
			</div>
		</LayoutAuth>
	);
};
