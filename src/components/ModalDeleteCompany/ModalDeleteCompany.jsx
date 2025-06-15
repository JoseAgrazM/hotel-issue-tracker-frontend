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

const initialForm = {
	loginPassword: '',
};

export const ModalDeleteCompany = () => {
	const { verifyUserPassword, userLog } = useAuthStore();
	const { startCleanStateUsers } = useUsersStore();
	const { startClearPost } = usePostsStore();
	const { startClearRooms } = useRoomStore();
	const { startDeleteCompany, companyActive, setActiveCompany } =
		useCompanyStore();
	const { closeModal } = useModalStore();

	const { loginPassword, onInputChange } = useForm(initialForm);

	const onDeleteCompany = async e => {
		e.preventDefault();

		const verifyAdmin = await verifyUserPassword({
			email: userLog.email,
			password: loginPassword,
		});

		if (!verifyAdmin.ok) {
			return Swal.fire({
				icon: 'error',
				title: 'Contraseña incorrecta',
				text: 'Por favor verifica tu contraseña e inténtalo de nuevo.',
			});
		}

		const resp = await startDeleteCompany(companyActive.id);

		if (resp.ok) {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Empresa eliminada con éxito!',
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
	};

	return (
		<LayoutModal title='Eliminar empresa ⚠️'>
			<p className='mb-6 text-center text-red-600 font-semibold'>
				Ingresa tu contraseña para eliminar la empresa
			</p>

			<form onSubmit={onDeleteCompany} className='space-y-6'>
				<div>
					<label
						htmlFor='email'
						className='block mb-2 font-medium text-gray-700'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						name='loginEmail'
						value={userLog.email}
						disabled
						className='w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-100 cursor-not-allowed text-gray-600'
					/>
				</div>

				<div>
					<label
						htmlFor='password'
						className='block mb-2 font-medium text-gray-700'
					>
						Contraseña
					</label>
					<input
						id='password'
						type='password'
						name='loginPassword'
						value={loginPassword}
						onChange={onInputChange}
						placeholder='Tu contraseña'
						required
						className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
					/>
				</div>

				<button
					type='submit'
					className='cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition'
					disabled={!loginPassword.trim()}
				>
					Eliminar
				</button>
			</form>
		</LayoutModal>
	);
};
