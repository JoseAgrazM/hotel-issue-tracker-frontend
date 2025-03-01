import { useCompanyStore } from '../../hooks/useCompanyStore';
import './CardCompany.css';

export const CardCompany = ({ company }) => {
	const { setActiveCompany } = useCompanyStore();
	const onSelectCompany = () => {
		setActiveCompany(company);
	};

	return (
		<div className='card_container_companies'>
			<h3 className='company_title'>{company?.companyName}</h3>
			<div className='company_details'>
				<p className='company_workers'>
					Número de trabajadores:
					<strong>{company?.users?.length || 0}</strong>
				</p>
				<button
					className='btn_select-company'
					onClick={onSelectCompany}
				>
					SELECT
				</button>
			</div>
		</div>
	);
};
