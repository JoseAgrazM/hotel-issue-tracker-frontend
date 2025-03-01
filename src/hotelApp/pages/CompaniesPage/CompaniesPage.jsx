import { useEffect } from 'react';
import {
	useModalStore,
	useCompanyStore,
	useUsersStore,
	useAuthStore,
} from '@/hooks';
import { ModalFormCompany, GridCompanies } from '@/components';
import { LoadingSpinner, LogoutIconSVG, ZeroCompanies } from '@/ui';
import './CompaniesPage.css';

export const CompaniesPage = () => {
	const { isModalOpen, openModal } = useModalStore();
	const { startLoadUsers } = useUsersStore();
	const { startLogout, userLog } = useAuthStore();
	const { companies } = useCompanyStore();

	useEffect(() => {
		startLoadUsers();
	}, []);

	return (
		<div className='companies_page_container'>
			<h1>Hello {userLog.name}</h1>
			<br />
			<h1>Select your company</h1>
			<button onClick={openModal} className='button_new_company'>
				New Company
			</button>

			<LogoutIconSVG onClick={startLogout} size='40' color='red' />

			{isModalOpen && <ModalFormCompany />}

			{!companies && companies.length < 1 && <LoadingSpinner />}

			{companies.length < 1 && <ZeroCompanies />}

			<GridCompanies companies={companies} />
		</div>
	);
};
