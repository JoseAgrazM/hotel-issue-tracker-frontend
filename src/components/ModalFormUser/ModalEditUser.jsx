import Swal from 'sweetalert2';
import { useForm, useModalStore, useUsersStore } from '../../hooks';
import { LayoutModal } from '../../hotelApp/Layouts';

export const ModalEditUser = () => {
  const { userActive } = useUsersStore();
  const { startEditUser } = useUsersStore();
  const { closeModal } = useModalStore();

  const { userName, surname, email, phone, role, onInputChange } = useForm(userActive);

  const onEditUser = async event => {
    event.preventDefault();
    if (userName.length < 4) {
      Swal.fire('Error en la actualización', 'El nombre debe tener mínimo 4 caracteres', 'error');
      return;
    }
    if (phone.length < 9) {
      Swal.fire('Error en la actualización', 'El número de teléfono debe tener al menos 9 dígitos', 'error');
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
        title: 'Usuario actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
		<LayoutModal title='Edit user'>
			<form onSubmit={onEditUser} className='space-y-6 px-6 py-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='flex flex-col'>
						<label
							htmlFor='userName'
							className='mb-1 font-semibold text-gray-700'
						>
							Nombre
						</label>
						<input
							id='userName'
							name='userName'
							value={userName || ''}
							onChange={onInputChange}
							type='text'
							required
							className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
							placeholder='Enter name'
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='surname'
							className='mb-1 font-semibold text-gray-700'
						>
							Apellidos
						</label>
						<input
							id='surname'
							name='surname'
							value={surname || ''}
							onChange={onInputChange}
							type='text'
							required
							className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
							placeholder='Enter surname'
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='phone'
							className='mb-1 font-semibold text-gray-700'
						>
							Teléfono
						</label>
						<input
							id='phone'
							name='phone'
							value={phone || ''}
							onChange={onInputChange}
							type='tel'
							required
							className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
							placeholder='Enter phone number'
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='email'
							className='mb-1 font-semibold text-gray-700'
						>
							Email
						</label>
						<input
							id='email'
							name='email'
							value={email || ''}
							onChange={onInputChange}
							type='email'
							required
							className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
							placeholder='Enter email'
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='role'
							className='mb-1 font-semibold text-gray-700'
						>
							Rol
						</label>
						<select
							id='role'
							name='role'
							value={role || ''}
							onChange={onInputChange}
							required
							className='rounded-md border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
						>
							<option value='' disabled>
								Selecciona un rol
							</option>
							<option value='RECEPTION'>Reception</option>
							<option value='MAINTENANCE'>Maintenance</option>
							<option value='CLEANING'>Cleaning</option>
						</select>
					</div>
				</div>

				<div className='flex justify-end'>
					<button
						type='submit'
						className='bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400'
					>
						Guardar
					</button>
				</div>
			</form>
		</LayoutModal>
  );
};
