import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
	CompaniesPage,
	HomePage,
	PostPage,
	RoomIdPage,
	RoomsPage,
	MyProfilePage,
	UsersPage,
} from '../pages';
import { useCompanyStore, useUsersStore } from '@/hooks';

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
					<Route path='/rooms/:id' element={<RoomIdPage />} />
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
