import { useModalStore, useUsersStore } from '../../hooks';
import { DeleteIconSVG } from '../../ui/DeleteIconSVG';
import { EditIconSVG } from '../../ui/EditIconSVG';
import './CardUser.css';

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
		<div role='button' className='card_container_user'>
			<h3 className='userName_title'>
				{userName} {surname}
			</h3>
			<div className='user_details'>
				<p>
					<strong>Teléfono:</strong> {phone || 'No disponible'}
				</p>
				<p>
					<strong>Rol:</strong> {role}
				</p>
			</div>
			<div className='container_buttons_options_users'>
				<EditIconSVG
					color='green'
					size={26}
					onClick={() => handleEditUser(user)}
				/>
				<DeleteIconSVG
					color='red'
					size={26}
					onClick={() => handleDeleteUser(id)}
				/>
			</div>
		</div>
	);
};
