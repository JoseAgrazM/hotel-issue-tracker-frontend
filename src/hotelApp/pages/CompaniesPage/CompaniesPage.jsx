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
		<div className='min-h-screen p-6 sm:p-8 bg-gray-50'>
			<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8'>
				<div>
					<h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
						Hello{' '}
						<span className='text-sky-600'>
							{userLog?.name || user?.name}
						</span>
					</h1>
					<p className='text-lg mt-1 text-gray-600'>
						Select your company
					</p>
				</div>

				<div className='flex gap-4'>
					<button
						onClick={openModal}
						className='bg-sky-600 cursor-pointer hover:bg-sky-700 text-white px-4 py-2 rounded-xl shadow-md transition duration-200'
					>
						New Company
					</button>

					<button
						onClick={startLogout}
						className='flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-xl hover:bg-red-50 transition duration-200'
					>
						<LogoutIconSVG size='24' color='red' />
						<span className='hidden sm:inline cursor-pointer'>Logout</span>
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
