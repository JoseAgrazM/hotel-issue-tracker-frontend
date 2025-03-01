import { useEffect } from 'react';
import { useUsersStore, useModalStore } from '@/hooks';
import { GridUsers, Navbar, ModalFormUser, ModalEditUser } from '@/components';
import { LayoutPage } from '../../Layouts';
import { NotUsers } from '@/ui';
import './UsersPage.css';

export const UsersPage = () => {
	const { isModalOpen, openModal, modalType } = useModalStore();
	const { startLoadUsers, users } = useUsersStore();

	useEffect(() => {
		startLoadUsers();
	}, []);

	return (
		<>
			<Navbar />
			<LayoutPage title='Users'>
				<button
					onClick={() => openModal('create')}
					className='button_new_user'
				>
					New User
				</button>
				{isModalOpen && modalType === 'create' && <ModalFormUser />}
				{isModalOpen && modalType === 'edit' && <ModalEditUser />}

				<GridUsers users={users} />

				{users?.length < 1 && <NotUsers />}
			</LayoutPage>
		</>
	);
};
