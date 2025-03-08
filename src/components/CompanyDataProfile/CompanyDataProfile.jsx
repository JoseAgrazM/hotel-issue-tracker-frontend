import { useModalStore } from '@/hooks';
import './CompanyDataProfile.css';

export const CompanyDataProfile = ({ companyActive, userLog }) => {
	const { openModal } = useModalStore();
	return (
		<div className='info_company'>
			<section className='headers_data_company'>
				<h2>Company Data 🏢</h2>
				<h3>{companyActive?.companyName}</h3>
				<section className='main_data_company'>
					<p>
						<strong>Country:</strong> {companyActive?.country}
					</p>
					<p>
						<strong>City:</strong> {companyActive?.city}
					</p>
					<p>
						<strong>Address:</strong>
						{companyActive?.addressCompany}
					</p>
					<p>
						<strong>Phone:</strong> {companyActive?.phoneCompany}
					</p>
					<p>
						<strong>Rooms:</strong>
						{companyActive?.rooms?.length || 0}
					</p>
					<p>
						<strong>Posts: </strong>
						{companyActive?.posts?.length || 0}
					</p>
					<p>
						<strong>Users:</strong>
						{companyActive?.users?.length || 0}
					</p>
				</section>
			</section>

			{userLog?.role === 'SUPERADMIN' && (
				<section className='headers_company_dangerZone'>
					<h2>Danger Zone ⚠️</h2>
					<section className='main_company_dangerZone'>
						<button
							className='edit_company'
							onClick={() => openModal('edit')}
						>
							Edit company
						</button>
						<button
							className='delete_company'
							onClick={() => openModal('delete')}
						>
							Delete Company
						</button>
					</section>
				</section>
			)}
		</div>
	);
};
