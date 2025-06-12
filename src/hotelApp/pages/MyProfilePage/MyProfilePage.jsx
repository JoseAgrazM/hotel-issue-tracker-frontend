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

	const onEditUser = async event => {
		event.preventDefault();
		if (name?.length < 4) {
			Swal.fire(
				'Error en la actualización',
				'El nombre debe de tener mínimo 4 caracteres',
				'error'
			);
			return;
		}
		if (phone.length < 9) {
			Swal.fire(
				'Error en la actualización',
				'El número de teléfono tiene que tener más de 9 dígitos',
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
				title: 'Se actualizó con éxito.',
				showConfirmButton: false,
				timer: 2000,
			});
		}
	};

	return (
		<>
			{isModalOpen && modalType === 'edit' && <ModalEditCompany />}
			{isModalOpen && modalType === 'delete' && <ModalDeleteCompany />}
			<Navbar />
			<LayoutPage title={`Profile: ${userLog.name} ${userLog.surname}`}>
				<div className='flex flex-col lg:flex-row gap-8 p-4'>
					{/* Información de la empresa y perfil */}
					<div className='lg:w-1/3 space-y-6'>
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

					{/* Formulario edición usuario */}
					<div className='lg:w-2/3 max-w-2xl bg-white p-6 rounded-lg shadow-md'>
						<h2 className='text-2xl font-semibold mb-6'>
							Edit Profile
						</h2>
						<form onSubmit={onEditUser} className='space-y-5'>
							<div>
								<label className='block mb-1 font-medium text-gray-700'>
									Name
								</label>
								<input
									name='name'
									value={name || ''}
									onChange={onInputChange}
									type='text'
									required
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
								/>
							</div>

							<div>
								<label className='block mb-1 font-medium text-gray-700'>
									Surname
								</label>
								<input
									name='surname'
									value={surname || ''}
									onChange={onInputChange}
									type='text'
									required
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
								/>
							</div>

							<div>
								<label className='block mb-1 font-medium text-gray-700'>
									Phone
								</label>
								<input
									name='phone'
									value={phone || ''}
									onChange={onInputChange}
									type='tel'
									required
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
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
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
								/>
							</div>

							<button
								type='submit'
								className='cursor-pointer bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-md transition'
							>
								Save
							</button>
						</form>
					</div>
				</div>
			</LayoutPage>
		</>
	);
};
