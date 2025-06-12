import { useEffect } from 'react';
import { useUsersStore, useModalStore } from '@/hooks';
import { GridUsers, ModalFormUser, ModalEditUser, Navbar } from '@/components';
import { LayoutPage } from '../../Layouts';
import { NotUsers } from '@/ui';

const ModalSelector = ({ isOpen, type }) => {
	if (!isOpen) return null;
	switch (type) {
		case 'create':
			return <ModalFormUser />;
		case 'edit':
			return <ModalEditUser />;
		default:
			return null;
	}
};

export const UsersPage = () => {
	const { isModalOpen, openModal, modalType } = useModalStore();
	const { startLoadUsers, users } = useUsersStore();

	useEffect(() => {
		startLoadUsers();
	}, [startLoadUsers]);

	return (
		<>
			<Navbar />
			<LayoutPage title='Users'>
				<div className='flex justify-evenly items-center mb-6 mt-10'>
					<h2 className='text-xl font-semibold text-gray-800'>
						Manage Users
					</h2>
					<button
						onClick={() => openModal('create')}
						className='cursor-pointer bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 text-white px-4 py-2 rounded-lg shadow-md transition duration-200'
						aria-label='Create new user'
						type='button'
					>
						New User
					</button>
				</div>

				<ModalSelector isOpen={isModalOpen} type={modalType} />

				{users?.length > 0 ? <GridUsers users={users} /> : <NotUsers />}
			</LayoutPage>
		</>
	);
};
