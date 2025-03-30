import { Navigate, Route, Routes } from 'react-router-dom';
import {
	HomePage,
	MyProfilePage,
	PostPage,
	RoomIdPage,
	RoomsPage,
} from '../pages';
import { useAuthStore, useCompanyStore, usePostsStore } from '../../hooks';
import { useEffect } from 'react';

export const UserRoutes = () => {
	const { startLoadCompanyActive, companyActive } = useCompanyStore();
	const { startLoadPost } = usePostsStore();
	const { userLog } = useAuthStore();

	useEffect(() => {
		startLoadCompanyActive(userLog.company);
		if (companyActive) {
			startLoadPost();
		}
	}, []);

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/rooms' element={<RoomsPage />} />
			<Route path='/rooms/:id' element={<RoomIdPage />} />
			<Route path='/post' element={<PostPage />} />
			<Route path='/post' element={<RoomIdPage />} />
			<Route path='/profile' element={<MyProfilePage />} />

			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
