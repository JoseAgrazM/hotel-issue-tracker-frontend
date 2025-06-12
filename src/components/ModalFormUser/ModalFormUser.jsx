import Swal from 'sweetalert2';
import { useForm, useModalStore } from '../../hooks';
import { useUsersStore } from '../../hooks/useUsersStore';
import { LayoutModal } from '../../hotelApp/Layouts';

const newUserForm = {
	userName: '',
	surname: '',
	phone: '',
	email: '',
	password: '',
	password2: '',
};

export const ModalFormUser = () => {
	const {
		userName,
		surname,
		email,
		password,
		password2,
		phone,
		onInputChange,
	} = useForm(newUserForm);

	const { startCreateUser } = useUsersStore();
	const { closeModal } = useModalStore();

	const onCreateUser = async event => {
		event.preventDefault();
		if (password !== password2) {
			Swal.fire(
				'Error en registro',
				'Las contraseñas no coinciden',
				'error'
			);
			return;
		}
		if (userName.length < 4) {
			Swal.fire(
				'Error en registro',
				'El nombre debe tener mínimo 4 caracteres',
				'error'
			);
			return;
		}
		if (phone.length < 9) {
			Swal.fire(
				'Error en registro',
				'El número de teléfono debe tener al menos 9 dígitos',
				'error'
			);
			return;
		}

		const resp = await startCreateUser({
			userName,
			surname,
			email,
			password,
			phone,
		});

		if (resp?.ok) {
			closeModal();
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Usuario creado con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='New User'>
			<form
				onSubmit={onCreateUser}
				className='px-6 py-4 space-y-4 max-w-md mx-auto'
			>
				<section className='flex flex-col space-y-1 '>
					<label className='font-semibold text-gray-700 '>Name</label>
					<input
						name='userName'
						value={userName || ''}
						onChange={onInputChange}
						type='text'
						required
						className='form-input border rounded-lg py-1 px-2'
						placeholder='Enter name'
					/>
				</section>

				<section className='flex flex-col space-y-1'>
					<label className='font-semibold text-gray-700'>
						Surname
					</label>
					<input
						name='surname'
						value={surname || ''}
						onChange={onInputChange}
						type='text'
						required
						className='form-input border rounded-lg py-1 px-2'
						placeholder='Enter surname'
					/>
				</section>

				<section className='flex flex-col space-y-1'>
					<label className='font-semibold text-gray-700'>Phone</label>
					<input
						name='phone'
						value={phone || ''}
						onChange={onInputChange}
						type='text'
						required
						className='form-input border rounded-lg py-1 px-2'
						placeholder='Enter phone number'
					/>
				</section>

				<section className='flex flex-col space-y-1'>
					<label className='font-semibold text-gray-700'>Email</label>
					<input
						name='email'
						value={email || ''}
						onChange={onInputChange}
						type='email'
						required
						className='form-input border rounded-lg py-1 px-2'
						placeholder='Enter email'
					/>
				</section>

				<section className='flex flex-col space-y-1'>
					<label className='font-semibold text-gray-700'>
						Password
					</label>
					<input
						name='password'
						value={password || ''}
						onChange={onInputChange}
						type='password'
						required
						className='form-input border rounded-lg py-1 px-2'
						placeholder='Enter password'
					/>
				</section>

				<section className='flex flex-col space-y-1'>
					<label className='font-semibold text-gray-700'>
						Repeat Password
					</label>
					<input
						name='password2'
						value={password2 || ''}
						onChange={onInputChange}
						type='password'
						required
						className='form-input border rounded-lg py-1 px-2'
						placeholder='Repeat password'
					/>
				</section>

				<div className='flex justify-end'>
					<button
						type='submit'
						className='bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400'
					>
						Send
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
