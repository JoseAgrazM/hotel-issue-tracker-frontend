import { useModalStore, useUsersStore } from '../../hooks';
import { DeleteIconSVG } from '../../ui/DeleteIconSVG';
import { EditIconSVG } from '../../ui/EditIconSVG';

export const CardUser = ({ user }) => {
	const { id, userName, phone, role, surname } = user;
	const { startDeleteUser, startUserActive } = useUsersStore();
	const { openModal } = useModalStore();

	const handleDeleteUser = id => {
		startDeleteUser(id);
	};

	const handleEditUser = user => {
		startUserActive(user);
		openModal('edit');
	};

	return (
		<div
			role='button'
			tabIndex={0}
			className='w-full max-w-sm bg-white rounded-3xl shadow-lg p-6 transition-shadow hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-300'
		>
			<h3 className='text-2xl font-bold text-gray-900 mb-3 truncate'>
				{userName} {surname}
			</h3>

			<div className='text-gray-700 space-y-2 mb-5 text-lg'>
				<p>
					<span className='font-semibold text-gray-800'>
						📞 Teléfono:
					</span>{' '}
					{phone || 'No disponible'}
				</p>
				<p>
					<span className='font-semibold text-gray-800'>🛡️ Rol:</span>{' '}
					{role}
				</p>
			</div>

			<div className='flex justify-end gap-6'>
				<button
					onClick={e => {
						e.stopPropagation();
						handleEditUser(user);
					}}
					aria-label={`Edit user ${userName} ${surname}`}
					className='text-green-600 hover:text-green-800 transition text-2xl'
					type='button'
				>
					<EditIconSVG color='currentColor' size={28} />
				</button>

				<button
					onClick={e => {
						e.stopPropagation();
						handleDeleteUser(id);
					}}
					aria-label={`Delete user ${userName} ${surname}`}
					className='text-red-600 hover:text-red-800 transition text-2xl'
					type='button'
				>
					<DeleteIconSVG color='currentColor' size={28} />
				</button>
			</div>
		</div>
	);
};
  