import { useDispatch, useSelector } from 'react-redux';
import hotelManagerApi from '../api/HotelManagerApi';
import {
	onAddNewCompany,
	onLoadCompanies,
	onSetActiveCompany,
} from '../store/company/companySlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const useCompanyStore = () => {
	const { isLoadingCompany, companies, companyActive } = useSelector(
		state => state.company
	);
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			if (error?.response?.data?.msg === 'Token no valido') {
				navigate('/login');
			}
			Swal.fire(
				'Error al recuperar las habitaciones',
				error?.response?.data?.msg,
				'error'
			);
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
			return data;
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
			if (error?.response?.data?.msg === 'Token no valido') {
				navigate('/login');
			}
			Swal.fire(
				'Error al recuperar las habitaciones',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startEditCompany = async ({
		companyName,
		phoneCompany,
		addressCompany,
		city,
		country,
	}) => {
		try {
			const { data } = await hotelManagerApi.patch(
				`/company/edit-company/${companyActive.id}`,
				{
					companyName,
					phoneCompany,
					addressCompany,
					city,
					country,
					superAdminId: companyActive.superAdminId,
				}
			);

			startLoadCompanyActive(companyActive);
			return data;
		} catch (error) {
			Swal.fire(
				'Error al actualizar la empresa',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startDeleteCompany = async id => {
		try {
			const { data } = await hotelManagerApi.delete(`/company/${id}`);

			startLoadCompanies();
			return data;
		} catch (error) {
			Swal.fire(
				'Error al eliminar la empresa',
				error?.response?.data?.msg,
				'error'
			);
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
		startEditCompany,
		startDeleteCompany,
	};
};
