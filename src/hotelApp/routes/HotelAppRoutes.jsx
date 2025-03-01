import {  Route, Routes } from 'react-router-dom';
import { AdminRoutes, UserRoutes } from './';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	useCompanyStore,
	usePostsStore,
	useRoomStore,
	useUsersStore,
} from '../../hooks';

export const HotelAppRoutes = () => {
	const { user, userLog } = useSelector(state => state.auth);
	const { startLoadCompanyActive, companyActive } = useCompanyStore();
	const { startLoadPost } = usePostsStore();
	const { startLoadRooms } = useRoomStore();
	const { startLoadUsers } = useUsersStore();

	useEffect(() => {
		if (userLog?.company) {
			startLoadCompanyActive(userLog.company);
		}
	}, [userLog?.company]);

	useEffect(() => {
		if (companyActive) {
			startLoadPost();
			startLoadRooms();
			startLoadUsers();
		}
	}, [companyActive]);

	return (
		<Routes>
			{user.role === 'SUPERADMIN' ? (
				<Route path='/*' element={<AdminRoutes />} />
			) : (
				<Route path='/*' element={<UserRoutes />} />
			)}
		</Routes>
	);
};
