import { useModalStore } from '@/hooks';

export const CompanyDataProfile = ({ companyActive, userLog }) => {
	const { openModal } = useModalStore();

	return (
		<div className='w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6 text-gray-800 text-sm'>
			<section>
				<h2 className='text-2xl font-extrabold mb-2 flex items-center gap-2'>
					<span
						role='img'
						aria-label='Company Building'
						className='text-3xl'
					>
						🏢
					</span>
					Company Data
				</h2>
				<h3 className='text-lg font-semibold text-gray-700'>
					{companyActive?.companyName}
				</h3>

				<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700'>
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
					<h2 className='text-xl font-bold text-red-600 mb-3 flex items-center gap-1'>
						<span
							role='img'
							aria-label='Warning'
							className='text-2xl'
						>
							⚠️
						</span>
						Danger Zone
					</h2>
					<div className='flex flex-col sm:flex-row gap-4'>
						<button
							onClick={() => openModal('edit')}
							className='cursor-pointer px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-500'
						>
							Edit Company
						</button>
						<button
							onClick={() => openModal('delete')}
							className='cursor-pointer px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-600'
						>
							Delete Company
						</button>
					</div>
				</section>
			)}
		</div>
	);
};
