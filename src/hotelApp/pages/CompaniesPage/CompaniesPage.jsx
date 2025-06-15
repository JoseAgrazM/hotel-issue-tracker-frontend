import { useEffect } from 'react';
import {
	useModalStore,
	useCompanyStore,
	useUsersStore,
	useAuthStore,
} from '@/hooks';
import { ModalFormCompany, GridCompanies } from '@/components';
import { LoadingSpinner, LogoutIconSVG, ZeroCompanies } from '@/ui';

export const CompaniesPage = () => {
	const { isModalOpen, openModal } = useModalStore();
	const { startLoadUsers } = useUsersStore();
	const { startLogout, userLog, user } = useAuthStore();
	const { companies } = useCompanyStore();

	useEffect(() => {
		startLoadUsers();
	}, []);

	return (
		<div className='min-h-screen p-4 sm:p-6 bg-gray-50'>
			<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6'>
				<div>
					<h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
						Hola{' '}
						<span className='text-sky-600'>
							{userLog?.name || user?.name}
						</span>
					</h1>
					<p className='text-sm sm:text-base mt-1 text-gray-600'>
						Selecciona tu compañía
					</p>
				</div>

				<div className='flex gap-3'>
					<button
						onClick={openModal}
						className='bg-sky-600 cursor-pointer hover:bg-sky-700 text-white px-3 py-1.5 rounded-lg shadow transition text-sm'
					>
						Nueva Compañía
					</button>

					<button
						onClick={startLogout}
						className='flex items-center gap-2 border border-red-500 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition text-sm'
					>
						<LogoutIconSVG size='20' color='red' />
						<span className='sm:inline cursor-pointer'>
							Cerrar sesión
						</span>
					</button>
				</div>
			</div>

			{isModalOpen && <ModalFormCompany />}

			{!companies && <LoadingSpinner />}
			{companies.length < 1 && <ZeroCompanies />}
			{companies.length > 0 && <GridCompanies companies={companies} />}
		</div>
	);
};
