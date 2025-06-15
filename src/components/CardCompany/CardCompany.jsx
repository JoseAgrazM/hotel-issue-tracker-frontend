import { useCompanyStore } from '../../hooks/useCompanyStore';
import { Building2 } from 'lucide-react';

export const CardCompany = ({ company }) => {
	const { setActiveCompany } = useCompanyStore();

	const onSelectCompany = () => {
		setActiveCompany(company);
	};

	const formatDate = new Date(company?.createdAt).toLocaleDateString(
		'es-ES',
		{
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		}
	);

	return (
		<div className='w-full max-w-md p-5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition space-y-4'>
			<div className='flex items-center gap-3'>
				<Building2 className='text-blue-600 w-6 h-6' />
				<h3 className='text-xl font-bold text-gray-900'>
					{company?.companyName}
				</h3>
			</div>

			<div className='space-y-2 text-sm text-gray-700'>
				<p>
					<strong>Trabajadores:</strong>{' '}
					<span className='text-blue-600 font-medium'>
						{company?.users?.length || 0}
					</span>
				</p>
				<p>
					<strong>País:</strong>{' '}
					<span className='text-blue-600 font-medium'>
						{company?.country}
					</span>
				</p>
				<p>
					<strong>Creada:</strong>{' '}
					<span className='text-blue-600 font-medium'>
						{formatDate}
					</span>
				</p>
			</div>

			<div className='flex justify-center'>
				<button
					onClick={onSelectCompany}
					className='cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition'
				>
					Seleccionar
				</button>
			</div>
		</div>
	);
};
