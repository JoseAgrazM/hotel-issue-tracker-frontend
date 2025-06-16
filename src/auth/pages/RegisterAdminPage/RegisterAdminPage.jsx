import { Link } from 'react-router-dom';
import { LayoutAuth } from '@/auth/Layouts/LayoutAuth/LayoutAuth';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../../hooks';

const registerForm = {
	registerName: '',
	registerSurname: '',
	registerEmail: '',
	registerPhone: '',
	registerPassword: '',
	registerPassword2: '',
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
				'La contraseña debe tener al menos 6 caracteres',
				'error'
			);
			return;
		}
		if (registerPhone.length < 9) {
			Swal.fire(
				'Error en registro',
				'El número de teléfono debe tener al menos 9 dígitos',
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
		<LayoutAuth title='Registrar administrador'>
			<form
				onSubmit={registerAdminSubmit}
				className='w-full max-w-md mx-auto space-y-6'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<section className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Nombre
							</label>
							<input
								className='w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='text'
								name='registerName'
								value={registerName}
								onChange={onInputChange}
								placeholder='Name'
								required
								autoComplete='given-name'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Apellidos
							</label>
							<input
								className='w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='text'
								name='registerSurname'
								value={registerSurname}
								onChange={onInputChange}
								placeholder='Surname'
								required
								autoComplete='family-name'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Teléfono
							</label>
							<input
								className='w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='tel'
								name='registerPhone'
								value={registerPhone}
								onChange={onInputChange}
								placeholder='699669966'
								required
								autoComplete='tel'
								maxLength={15}
							/>
						</div>
					</section>

					<section className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Email
							</label>
							<input
								className='w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='email'
								name='registerEmail'
								value={registerEmail}
								onChange={onInputChange}
								placeholder='example@google.es'
								required
								autoComplete='email'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Contraseña
							</label>
							<input
								className='w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='password'
								name='registerPassword'
								value={registerPassword}
								onChange={onInputChange}
								placeholder='Your password'
								required
								autoComplete='new-password'
								minLength={6}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Repite la contraseña
							</label>
							<input
								className='w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='password'
								name='registerPassword2'
								value={registerPassword2}
								onChange={onInputChange}
								placeholder='Repeat your password'
								required
								autoComplete='new-password'
								minLength={6}
							/>
						</div>
					</section>
				</div>

				<div className='flex items-center justify-center'>
					<input
						className='w-72 bg-sky-600 text-white py-2.5 rounded-md text-base font-medium cursor-pointer hover:bg-sky-700 transition'
						type='submit'
						value='Crear cuenta'
					/>
				</div>
			</form>

			<div className='text-center text-sm text-gray-600 mt-6 '>
				<Link to='/auth/login' className='hover:underline'>
					¿Ya tienes una cuenta? Inicia sesión
				</Link>
			</div>
		</LayoutAuth>
	);
};
