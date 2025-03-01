import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
	CompaniesPage,
	HomePage,
	PostPage,
	RoomIdPage,
	RoomsPage,
	MyProfilePage,
} from '../pages';
import { UsersPage } from '../pages/UsersPage/UsersPage';
import { useCompanyStore, useUsersStore } from '../../hooks';
import { useEffect } from 'react';

export const AdminRoutes = () => {
	const { companyActive, startLoadCompanies, startLoadCompanyActive } =
		useCompanyStore();
	const { startLoadUsers } = useUsersStore();

	useEffect(() => {
		const loadInitialData = async () => {
			await startLoadCompanies();
			await startLoadUsers();
			await startLoadCompanyActive();
		};
		loadInitialData();
	}, []);

	return (
		<Routes>
			{companyActive ? (
				<>
					<Route path='/' element={<HomePage />} />
					<Route path='/rooms' element={<RoomsPage />} />
					<Route path='/room/:id' element={<RoomIdPage />} />
					<Route path='/post' element={<PostPage />} />
					<Route path='/users' element={<UsersPage />} />
					<Route path='/post' element={<RoomIdPage />} />
					<Route path='/profile' element={<MyProfilePage />} />

					<Route path='/*' element={<Navigate to='/' />} />
				</>
			) : (
				<>
					<Route path='/select-company' element={<CompaniesPage />} />
					<Route
						path='/*'
						element={<Navigate to='/select-company' />}
					/>
				</>
			)}
		</Routes>
	);
};
