import Swal from 'sweetalert2';
import { LayoutModal } from '../../hotelApp/Layouts';
import {
	useModalStore,
	useCompanyStore,
	useForm,
	useAuthStore,
	usePostsStore,
	useRoomStore,
	useUsersStore,
} from '@/hooks';

const delteCompayForm = {
	password: '',
};

export const ModalDeleteCompany = () => {
	const { verifyUserPassword, userLog } = useAuthStore();
	const { startCleanStateUsers } = useUsersStore();
	const { startClearPost } = usePostsStore();
	const { startClearRooms } = useRoomStore();
	const { startDeleteCompany, companyActive, setActiveCompany } =
		useCompanyStore();
	const { closeModal } = useModalStore();

	const { loginPassword, onInputChange } = useForm(delteCompayForm);

	const onDeleteCompany = async event => {
		event.preventDefault();

		const verifyAdmin = await verifyUserPassword({
			email: userLog.email,
			password: loginPassword,
		});

		if (verifyAdmin.ok) {
			const resp = await startDeleteCompany(companyActive.id);

			if (resp.ok) {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Empresa eliminada con exito!',
					showConfirmButton: false,
					timer: 1500,
				});
				setActiveCompany(null);
				startCleanStateUsers();
				startClearPost();
				startClearRooms();
				localStorage.removeItem('companyActiveId');
				closeModal();
			}
		}
	};
	return (
		<LayoutModal title='Delete company'>
			<h4>Ingresa la contraseña para eliminar la empresa</h4>
			<br />
			<form onSubmit={onDeleteCompany} className='form-user-container'>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						className='form-input'
						id='email'
						type='email'
						name='loginEmail'
						value={userLog.email}
						onChange={onInputChange}
						placeholder='example@google.es'
						disabled
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						className='form-input'
						id='password'
						type='password'
						name='loginPassword'
						value={loginPassword || ''}
						onChange={onInputChange}
						placeholder='Enter your password...'
						required
					/>
				</div>
				<div className='form-group'>
					<input
						className='buttton-form-send'
						type='submit'
						value='Send'
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
