import { useDispatch, useSelector } from 'react-redux';
import hotelManagerApi from '../api/HotelManagerApi';
import Swal from 'sweetalert2';

import {
	onAddNewUser,
	onDeleteUser,
	onLoadUsers,
	onLogoutUsers,
	onSetActiveUser,
	onClearUserActive,
	onLogin,
} from '../store';
import { useCompanyStore } from './useCompanyStore';
import { useCallback } from 'react';
import { useAuthStore } from './useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useUsersStore = () => {
	const { user } = useSelector(state => state.auth);
	const { users, isLoadingUsers, userActive } = useSelector(
		state => state.users
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { companyActive, startLoadCompanyActive } = useCompanyStore();
	const { startGetUserLogin, userLog } = useAuthStore();

	const handleError = (error, defaultMessage) => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error?.response?.data?.msg || defaultMessage,
		});
	};

	const startCreateUser = async newUser => {
		if (!newUser) return;
		if (!companyActive) return;
		const { userName, surname, email, password, phone } = newUser;

		try {
			const { data } = await hotelManagerApi.post('/auth/new', {
				userName,
				surname,
				email,
				password,
				companyId: companyActive.id,
				phone,
			});
			dispatch(onAddNewUser(data.user));
			startLoadCompanyActive(companyActive);
			return data;
		} catch (error) {
			Swal.fire('Error en registro', error?.response?.data?.msg, 'error');
		}
	};

	const startLoadUsers = useCallback(async () => {
		if (user.role !== 'SUPERADMIN' || !companyActive) return;

		try {
			const { data } = await hotelManagerApi.get(
				`/auth/company/${companyActive.id}`
			);
			dispatch(onLoadUsers(data.users));
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
	}, [user.role, companyActive, dispatch]);

	const startDeleteUser = async id => {
		try {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete user!',
			}).then(async result => {
				if (result.isConfirmed) {
					const { data } = await hotelManagerApi.delete(
						`/auth/${id}`
					);

					dispatch(onDeleteUser(data.user));
					startLoadCompanyActive(companyActive);
					Swal.fire({
						title: 'Deleted!',
						text: 'The user has been successfully deleted.',
						icon: 'success',
					});
				}
			});
		} catch (error) {
			Swal.fire(
				'Error al eliminar usuario',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startUserActive = user => {
		dispatch(onSetActiveUser(user));
	};

	const startEditUser = async user => {
		const { id, userName, name, surname, email, role, phone } = user;

		const updatedName = userName || name;

		try {
			if (role !== 'SUPERADMIN') {
				const { data } = await hotelManagerApi.patch(
					`/auth/edit-user/${id}`,
					{
						userName: updatedName,
						surname,
						email,
						role,
						companyId: companyActive.id,
						phone,
					}
				);

				if (userLog.id === data.updatedUser.id) {
					dispatch(
						onLogin({
							name: data.updatedUser.userName,
							uid: data.updatedUser.id,
							role: data.updatedUser.role,
						})
					);
					startGetUserLogin(data.updatedUser.id);
				}

				startLoadCompanyActive(companyActive);
				return data;
			}
			const { data } = await hotelManagerApi.patch(
				`/auth/edit-admin/${id}`,
				{
					name: updatedName,
					surname,
					email,
					role,
					phone,
				}
			);

			if (userLog.id === data.updatedAdmin.id) {
				dispatch(
					onLogin({
						name: data.updatedAdmin.name,
						uid: data.updatedAdmin.id,
						role: data.updatedAdmin.role,
					})
				);
				startGetUserLogin(data.updatedAdmin.id);
			}

			startLoadCompanyActive(companyActive);
			return data;
		} catch (error) {
			Swal.fire(
				'Error al actualizar usuario',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startCleanStateUsers = () => {
		dispatch(onLogoutUsers());
	};

	const startClearUserActive = () => {
		dispatch(onClearUserActive());
	};
	return {
		//*Properties
		users,
		isLoadingUsers,
		userActive,

		//*Methods
		startCreateUser,
		startLoadUsers,
		startDeleteUser,
		startCleanStateUsers,
		startUserActive,
		startEditUser,
		startClearUserActive,
	};
};
