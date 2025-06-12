import { CardCompany } from '../CardCompany/CardCompany';

export const GridCompanies = ({ companies = [] }) => {
	return (
		<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4'>
			{companies.map(company => (
				<CardCompany key={company.id} company={company} />
			))}
		</div>
	);
};
