import { CardCompany } from '../CardCompany/CardCompany';
import './GridCompanies.css';

export const GridCompanies = ({ companies = [] }) => {
	return (
		<div className='grid_container_companies'>
			{companies?.map(company => (
				<CardCompany key={company.id} company={company} />
			))}
		</div>
	);
};
