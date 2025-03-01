import { Navigate, Route, Routes } from 'react-router-dom';
import { ForgotPasswordPage, LoginPage, RegisterAdminPage, RegisterUserPage } from '../pages';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path='login' element={<LoginPage />} />
			<Route path='register-admin' element={<RegisterAdminPage />} />
			<Route path='forgot-password' element={<ForgotPasswordPage />} />
			{/* <Route path='register-user' element={<RegisterUserPage />} /> */}

			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
