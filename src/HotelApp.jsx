import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HotelAppRoutes } from './hotelApp/routes/HotelAppRoutes';
import { AuthRoutes } from './auth/routes/AuthRoutes';
import { useAuthStore, useCompanyStore } from './hooks';
import { LoadingSpinner } from './ui';

export const HotelApp = () => {
	const { status, checkAuthToken } = useAuthStore();
	const { companyActive } = useCompanyStore();
	// let resp;

	// if (resp?.ok === false) {
	// 	return (
	// 		<>
	// 			<h3>La sesión a caducado, vuelve a iniciar sesión</h3>
	// 			<Route path='/auth/*' element={<AuthRoutes />} />
	// 			<Route path='/*' element={<Navigate to='/auth/login' />} />
	// 		</>
	// 	);
	// }

	useEffect(() => {
		checkAuthToken();
	}, []);

	if (status === 'checking' && !companyActive) return <LoadingSpinner />;

	return (
		<Routes>
			{status === 'not-authenticated' && !companyActive ? (
				<>
					<Route path='/auth/*' element={<AuthRoutes />} />
					<Route path='/*' element={<Navigate to='/auth/login' />} />
				</>
			) : (
				<>
					<Route path='/*' element={<HotelAppRoutes />} />
					<Route path='/*' element={<Navigate to='/' />} />
				</>
			)}
		</Routes>
	);
};
