import Swal from 'sweetalert2';
import { useForm, useModalStore, useUsersStore } from '../../hooks';
import { LayoutModal } from '../../hotelApp/Layouts';

export const ModalEditUser = () => {
	const { userActive } = useUsersStore();
	const { startEditUser } = useUsersStore();
	const { closeModal } = useModalStore();

	const { userName, surname, email, phone, role, onInputChange } =
		useForm(userActive);

	const onEditUser = async event => {
		event.preventDefault();
		if (userName.length < 4) {
			Swal.fire(
				'Error en la actualización',
				'El nombre debe de tener minimo 4 caracteres',
				'error'
			);
			return;
		}
		if (phone.length < 9) {
			Swal.fire(
				'Error en la actualización',
				'El numero de telefono tiene que tener mas de 9 digitos',
				'error'
			);
			return;
		}

		const updatedUser = {
			...userActive,
			userName,
			surname,
			email,
			phone,
			role,
		};

		const resp = await startEditUser(updatedUser);

		if (resp?.ok) {
			closeModal();

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Usuario actualizado con exito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='Edit user'>
			<form
				onSubmit={onEditUser}
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
								type='tel'
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
							<label>Role</label>

							<select
								name='role'
								value={role || ''}
								onChange={onInputChange}
								className='form-input'
								required
							>
								<option value='' disabled>
									Selecciona un rol
								</option>
								<option value='RECEPTION'>Reception</option>
								<option value='MAINTENANCE'>Maintenance</option>
								<option value='CLEANING'>Cleaning</option>
							</select>
						</div>
					</section>
				</div>
				<div className='form-user-group'>
					<input
						className='buttton-form-user-send'
						type='submit'
						value='Save'
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
