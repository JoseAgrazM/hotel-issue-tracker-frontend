import { useModalStore } from '@/hooks';

export const CompanyDataProfile = ({ companyActive, userLog }) => {
	const { openModal } = useModalStore();

	return (
		<div className='w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8'>
			<section>
				<h2 className='text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-3'>
					<span
						role='img'
						aria-label='Company Building'
						className='text-4xl'
					>
						🏢
					</span>{' '}
					Company Data
				</h2>
				<h3 className='text-xl text-gray-700 font-semibold'>
					{companyActive?.companyName}
				</h3>

				<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-lg'>
					<p>
						<strong className='text-gray-800'>Country:</strong>{' '}
						{companyActive?.country}
					</p>
					<p>
						<strong className='text-gray-800'>City:</strong>{' '}
						{companyActive?.city}
					</p>
					<p>
						<strong className='text-gray-800'>Address:</strong>{' '}
						{companyActive?.addressCompany}
					</p>
					<p>
						<strong className='text-gray-800'>Phone:</strong>{' '}
						{companyActive?.phoneCompany}
					</p>
					<p>
						<strong className='text-gray-800'>Rooms:</strong>{' '}
						{companyActive?.rooms?.length || 0}
					</p>
					<p>
						<strong className='text-gray-800'>Posts:</strong>{' '}
						{companyActive?.posts?.length || 0}
					</p>
					<p>
						<strong className='text-gray-800'>Users:</strong>{' '}
						{companyActive?.users?.length || 0}
					</p>
				</div>
			</section>

			{userLog?.role === 'SUPERADMIN' && (
				<section>
					<h2 className='text-2xl font-bold text-red-600 mb-4 flex items-center gap-2'>
						<span
							role='img'
							aria-label='Warning'
							className='text-3xl'
						>
							⚠️
						</span>{' '}
						Danger Zone
					</h2>
					<div className='flex flex-col sm:flex-row gap-6'>
						<button
							onClick={() => openModal('edit')}
							className='cursor-pointer px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-500'
						>
							Edit Company
						</button>
						<button
							onClick={() => openModal('delete')}
							className='cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-600'
						>
							Delete Company
						</button>
					</div>
				</section>
			)}
		</div>
	);
};
