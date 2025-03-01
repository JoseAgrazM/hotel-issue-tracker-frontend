import { Link } from 'react-router-dom';
import { LayoutAuth } from '@/auth/Layouts/LayoutAuth/LayoutAuth';
import './registerAdminPage.css';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../../hooks';

const registerForm = {
	name: '',
	surname: '',
	email: '',
	phone: '',
	password: '',
	password2: '',
};

export const RegisterAdminPage = () => {
	const { startRegisterAdmin } = useAuthStore();

	const {
		registerName,
		registerSurname,
		registerPhone,
		registerEmail,
		registerPassword,
		registerPassword2,
		onInputChange,
	} = useForm(registerForm);

	const registerAdminSubmit = event => {
		event.preventDefault();

		if (registerPassword !== registerPassword2) {
			Swal.fire(
				'Error en registro',
				'Las contraseñas no coinciden',
				'error'
			);
			return;
		}
		if (registerPassword.length < 6) {
			Swal.fire(
				'Error en registro',
				'La contraseña debe de tener mas de 5 caracteres',
				'error'
			);
			return;
		}
		if (registerPhone.length < 9) {
			Swal.fire(
				'Error en registro',
				'El numero de telefono tiene que tener mas de 9 digitos',
				'error'
			);
			return;
		}

		startRegisterAdmin({
			name: registerName,
			surname: registerSurname,
			email: registerEmail,
			phone: registerPhone,
			password: registerPassword,
		});
	};

	return (
		<LayoutAuth title='Register Admin'>
			<form
				onSubmit={registerAdminSubmit}
				className='form-admin-container'
				action=''
			>
				<div className='container-section-form'>
					<section className='section-register-form'>
						<div className='form-admin-group'>
							<label>Name</label>
							<input
								className='form-input'
								type='text'
								name='registerName'
								value={registerName || ''}
								onChange={onInputChange}
								placeholder='Name'
								required
							/>
						</div>
						<div className='form-admin-group'>
							<label>Surname</label>
							<input
								className='form-input'
								type='text'
								name='registerSurname'
								value={registerSurname || ''}
								onChange={onInputChange}
								required
							/>
						</div>

						<div className='form-admin-group'>
							<label>Phone</label>
							<input
								className='form-input'
								type='text'
								name='registerPhone'
								value={registerPhone || ''}
								onChange={onInputChange}
								required
							/>
						</div>
					</section>
					<section className='section-register-form'>
						<div className='form-admin-group'>
							<label>Email</label>
							<input
								className='form-input'
								type='email'
								name='registerEmail'
								value={registerEmail || ''}
								onChange={onInputChange}
								required
							/>
						</div>

						<div className='form-admin-group'>
							<label>Password</label>
							<input
								className='form-input'
								type='password'
								name='registerPassword'
								value={registerPassword || ''}
								onChange={onInputChange}
								required
							/>
						</div>
						<div className='form-admin-group'>
							<label>Repeat password</label>
							<input
								className='form-input'
								type='password'
								name='registerPassword2'
								value={registerPassword2 || ''}
								onChange={onInputChange}
								required
							/>
						</div>
					</section>
				</div>

				<div className='form-admin-group'>
					<input
						className='buttton-form-admin-send'
						type='submit'
						value='Send'
					/>
				</div>
			</form>

			<div className='container-links-create'>
				<Link to='/auth/login' className='links-auth-pages'>
					Sign In
				</Link>
				{/* <Link to='/auth/register-user' className='links-auth-pages'>
					Create user account
				</Link> */}
			</div>
		</LayoutAuth>
	);
};
