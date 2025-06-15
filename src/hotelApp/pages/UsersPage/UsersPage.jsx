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
				<section className='px-4 sm:px-8 py-6 w-full'>
					<header className='mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
						<h2 className='text-2xl font-bold text-gray-800'>
							Listado de Empleados
						</h2>
					</header>
					<button
						onClick={() => openModal('create')}
						className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition mb-5'
						aria-label='Create new user'
						type='button'
					>
						Nuevo empleado
					</button>
					<ModalSelector isOpen={isModalOpen} type={modalType} />

					{users?.length > 0 ? (
						<GridUsers users={users} />
					) : (
						<NotUsers />
					)}
				</section>
				<div className='flex justify-start items-center mb-6 mt-10'></div>
			</LayoutPage>
		</>
	);
};
