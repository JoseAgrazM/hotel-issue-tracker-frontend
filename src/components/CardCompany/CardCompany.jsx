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
		<div className='w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 space-y-6'>
			<div className='flex items-center gap-4'>
				<Building2 className='text-blue-600 w-8 h-8' />
				<h3 className='text-2xl font-bold text-gray-900'>
					{company?.companyName}
				</h3>
			</div>

			<div className='space-y-3 text-lg text-gray-700'>
				<p>
					<strong>Número de trabajadores:</strong>{' '}
					<span className='text-blue-600 font-semibold'>
						{company?.users?.length || 0}
					</span>
				</p>
				<p>
					<strong>País:</strong>{' '}
					<span className='text-blue-600 font-semibold'>
						{company?.country}
					</span>
				</p>
				<p>
					<strong>Empresa creada:</strong>{' '}
					<span className='text-blue-600 font-semibold'>
						{formatDate}
					</span>
				</p>
			</div>

			<div className='flex justify-center'>
				<button
					onClick={onSelectCompany}
					className='cursor-pointer px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition'
				>
					Seleccionar
				</button>
			</div>
		</div>
	);
};
