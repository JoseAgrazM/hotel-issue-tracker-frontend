import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
	useAuthStore,
	useCompanyStore,
	useForm,
	useModalStore,
	useUsersStore,
	usePostsStore,
} from '@/hooks';
import {
	Navbar,
	CompanyDataProfile,
	InfoPersonalProfile,
	ModalEditCompany,
	ModalDeleteCompany,
} from '@/components';
import { LayoutPage } from '../../Layouts';

export const MyProfilePage = () => {
	const { userLog } = useAuthStore();
	const { companyActive } = useCompanyStore();
	const { closeModal, modalType, isModalOpen } = useModalStore();
	const { startEditUser } = useUsersStore();
	const { posts } = usePostsStore();

	const navigate = useNavigate();

	useEffect(() => {
		if (!companyActive) {
			navigate('/');
		}
	}, [companyActive, navigate]);

	const initialUserData = useMemo(
		() => ({
			name: userLog.name,
			surname: userLog.surname,
			phone: userLog.phone,
			email: userLog.email,
		}),
		[userLog]
	);

	const { name, surname, phone, email, onInputChange } =
		useForm(initialUserData);

	const onEditUser = async e => {
		e.preventDefault();
		if (name?.length < 4) {
			Swal.fire(
				'Error',
				'El nombre debe tener al menos 4 caracteres',
				'error'
			);
			return;
		}
		if (phone.length < 9) {
			Swal.fire(
				'Error',
				'El teléfono debe tener mínimo 9 dígitos',
				'error'
			);
			return;
		}

		const updatedUser = { ...userLog, name, surname, phone, email };
		const resp = await startEditUser(updatedUser);

		if (resp?.ok) {
			closeModal();
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Actualizado con éxito',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<>
			{isModalOpen && modalType === 'edit' && <ModalEditCompany />}
			{isModalOpen && modalType === 'delete' && <ModalDeleteCompany />}
			<Navbar />
			<LayoutPage title={`Perfil: ${userLog.name} ${userLog.surname}`}>
				<div className='flex flex-col lg:flex-row gap-6 p-3'>
					{/* Info empresa y perfil */}
					<div className='lg:w-1/3 space-y-4 text-sm'>
						<InfoPersonalProfile
							userLog={userLog}
							companyActive={companyActive}
							postsCompany={posts}
						/>
						<CompanyDataProfile
							companyActive={companyActive}
							userLog={userLog}
						/>
					</div>

					{/* Form editar usuario */}
					<div className='lg:w-2/3 max-w-xl bg-white p-4 rounded-md shadow-sm text-sm'>
						<h2 className='text-xl font-semibold mb-4'>
							Editar Perfil
						</h2>
						<form onSubmit={onEditUser} className='space-y-4'>
							<div>
								<label className='block mb-1 font-medium text-gray-700'>
									Nombre
								</label>
								<input
									name='name'
									value={name || ''}
									onChange={onInputChange}
									type='text'
									required
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm'
								/>
							</div>

							<div>
								<label className='block mb-1 font-medium text-gray-700'>
									Apellidos
								</label>
								<input
									name='surname'
									value={surname || ''}
									onChange={onInputChange}
									type='text'
									required
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm'
								/>
							</div>

							<div>
								<label className='block mb-1 font-medium text-gray-700'>
									Teléfono
								</label>
								<input
									name='phone'
									value={phone || ''}
									onChange={onInputChange}
									type='tel'
									required
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm'
								/>
							</div>

							<div>
								<label className='block mb-1 font-medium text-gray-700'>
									Email
								</label>
								<input
									name='email'
									value={email || ''}
									onChange={onInputChange}
									type='email'
									required
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm'
								/>
							</div>

							<button
								type='submit'
								className='cursor-pointer bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2 rounded-md transition text-sm'
							>
								Guardar
							</button>
						</form>
					</div>
				</div>
			</LayoutPage>
		</>
	);
};
