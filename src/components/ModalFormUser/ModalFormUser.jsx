import Swal from 'sweetalert2';
import { useForm, useModalStore } from '../../hooks';
import { useUsersStore } from '../../hooks/useUsersStore';
import { LayoutModal } from '../../hotelApp/Layouts';

const newUserForm = {
	name: '',
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
				'El nombre debe de tener minimo 4 caracteres',
				'error'
			);
			return;
		}
		if (phone.length < 9) {
			Swal.fire(
				'Error en registro',
				'El numero de telefono tiene que tener mas de 9 digitos',
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
				title: 'Usuario creado con exito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='New User'>
			<form
				onSubmit={onCreateUser}
				className='form-user-container'
				action=''
			>
				<div className='container-section-form'>
					<section className='section-register-form'>
						<div className='form-user-group'>
							<label>Name</label>
							<input
								name='userName'
								value={userName || ''}
								onChange={onInputChange}
								className='form-input'
								type='text'
								required
							/>
						</div>
						<div className='form-user-group'>
							<label>Surname</label>
							<input
								name='surname'
								value={surname || ''}
								onChange={onInputChange}
								className='form-input'
								type='text'
								required
							/>
						</div>
						<div className='form-user-group'>
							<label>Phone</label>
							<input
								name='phone'
								value={phone || ''}
								onChange={onInputChange}
								className='form-input'
								type='text'
								required
							/>
						</div>
					</section>
					<section className='section-register-form'>
						<div className='form-user-group'>
							<label>Email</label>
							<input
								name='email'
								value={email || ''}
								onChange={onInputChange}
								className='form-input'
								type='email'
								required
							/>
						</div>

						<div className='form-user-group'>
							<label>Password</label>
							<input
								name='password'
								value={password || ''}
								onChange={onInputChange}
								className='form-input'
								type='password'
								required
							/>
						</div>
						<div className='form-user-group'>
							<label>Repeat password</label>
							<input
								name='password2'
								value={password2 || ''}
								onChange={onInputChange}
								className='form-input'
								type='password'
								required
							/>
						</div>
					</section>
				</div>
				<div className='form-user-group'>
					<input
						className='buttton-form-user-send'
						type='submit'
						value='Send'
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
