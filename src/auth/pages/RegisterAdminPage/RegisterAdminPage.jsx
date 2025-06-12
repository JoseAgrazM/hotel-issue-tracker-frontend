import { Link } from 'react-router-dom';
import { LayoutAuth } from '@/auth/Layouts/LayoutAuth/LayoutAuth';
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
				'La contraseña debe de tener más de 5 caracteres',
				'error'
			);
			return;
		}
		if (registerPhone.length < 9) {
			Swal.fire(
				'Error en registro',
				'El número de teléfono debe tener más de 9 dígitos',
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
				className='max-w-6xl min-w-full mx-auto space-y-10 p-6'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					<section className='space-y-8'>
						<div>
							<label className='block text-base font-medium text-gray-700 mb-2'>
								Name
							</label>
							<input
								className='w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='text'
								name='registerName'
								value={registerName || ''}
								onChange={onInputChange}
								placeholder='Name'
								required
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700 mb-2'>
								Surname
							</label>
							<input
								className='w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='text'
								name='registerSurname'
								value={registerSurname || ''}
								onChange={onInputChange}
								placeholder='Surname'
								required
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700 mb-2'>
								Phone
							</label>
							<input
								className='w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='text'
								name='registerPhone'
								value={registerPhone || ''}
								onChange={onInputChange}
								required
								placeholder='699669966'
							/>
						</div>
					</section>

					<section className='space-y-8'>
						<div>
							<label className='block text-base font-medium text-gray-700 mb-2'>
								Email
							</label>
							<input
								className='w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='email'
								name='registerEmail'
								value={registerEmail || ''}
								onChange={onInputChange}
								required
								placeholder='example@google.es'
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700 mb-2'>
								Password
							</label>
							<input
								className='w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='password'
								name='registerPassword'
								value={registerPassword || ''}
								onChange={onInputChange}
								required
								placeholder='Your password'
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700 mb-2'>
								Repeat password
							</label>
							<input
								className='w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='password'
								name='registerPassword2'
								value={registerPassword2 || ''}
								onChange={onInputChange}
								required
								placeholder='Repeat your password'
							/>
						</div>
					</section>
				</div>

				<div>
					<input
						className='w-full bg-sky-600 text-white py-3 rounded-lg text-lg font-semibold cursor-pointer hover:bg-sky-700 transition'
						type='submit'
						value='Send'
					/>
				</div>
			</form>

			<div className='mt-8 text-center text-base text-gray-600 space-y-4'>
				<Link to='/auth/login' className='block hover:underline'>
					Sign In
				</Link>
				{/* <Link to='/auth/register-user' className='block hover:underline'>
						  Create user account
					  </Link> */}
			</div>
		</LayoutAuth>
	);
};
