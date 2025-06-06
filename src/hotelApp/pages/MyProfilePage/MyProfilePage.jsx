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
import './MyProfilePage.css';

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

	const {
		id,
		name: userName,
		surname: lastName,
		phone: userPhone,
		email: userEmail,
	} = userLog;

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
			...userLog,
			name,
			surname,
			phone,
			email,
		};

		const resp = await startEditUser(updatedUser);

		if (resp?.ok) {
			closeModal();

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Se actualizo con exito.',
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
				<div className='parent'>
					<CompanyDataProfile
						companyActive={companyActive}
						userLog={userLog}
					/>

					<InfoPersonalProfile
						userLog={userLog}
						companyActive={companyActive}
						postsCompany={posts}
					/>

					<div className='edit_form_user_profile'>
						<form onSubmit={onEditUser} action=''>
							<div className='form-user-group'>
								<label>Name</label>
								<input
									name='name'
									value={name || ''}
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
							<input
								className='input_submit_profile_save'
								type='submit'
								value='Save'
							/>
						</form>
					</div>
				</div>
			</LayoutPage>
		</>
	);
};
