import { useDispatch, useSelector } from 'react-redux';
import hotelManagerApi from '../api/HotelManagerApi';
import {
	onAddNewCompany,
	clearErrorMessageCompany,
	onLoadCompanies,
	onSetActiveCompany,
} from '../store/company/companySlice';
import Swal from 'sweetalert2';

export const useCompanyStore = () => {
	const { isLoadingCompany, companies, companyActive } = useSelector(
		state => state.company
	);
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const setActiveCompany = company => {
		dispatch(onSetActiveCompany(company));
		localStorage.setItem('companyActiveId', company?.id);
	};

	const startLoadCompanyActive = async (company = null) => {
		const lastCompanyActive = localStorage.getItem('companyActiveId');

		if (!company && !lastCompanyActive) return;

		try {
			if (user.role === 'SUPERADMIN') await startLoadCompanies();

			const companyId = company?.id || lastCompanyActive;

			const { data } = await hotelManagerApi.get(`/company/${companyId}`);

			setActiveCompany(data.company);
		} catch (error) {
			localStorage.removeItem('companyActiveId');
			Swal.fire(
				'Error',
				error?.response?.data?.msg || 'Error cargando compañía',
				'error'
			);
		}
	};

	const startCreateCompany = async company => {
		if (user.role !== 'SUPERADMIN') return;
		try {
			const { data } = await hotelManagerApi.post('/company/new', {
				...company,
				superAdminId: user.uid,
			});

			dispatch(onAddNewCompany(data?.company));
		} catch (error) {
			Swal.fire('Error en registro', error?.response?.data?.msg, 'error');
		}
	};

	const startLoadCompanies = async () => {
		if (user.role !== 'SUPERADMIN') return;

		try {
			const { data } = await hotelManagerApi.get(
				`/company/admin/${user.uid}`
			);

			dispatch(onLoadCompanies(data?.companies));
		} catch (error) {
			throw new Error('Error al recuperar las empresas');
		}
	};

	return {
		//* Properties
		isLoadingCompany,
		companies,
		companyActive,
		//* Methods
		startCreateCompany,
		startLoadCompanies,
		setActiveCompany,
		startLoadCompanyActive,
	};
};
