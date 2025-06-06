import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import hotelManagerApi from '../api/HotelManagerApi';
import {
	onChecking,
	onLogoutCompany,
	onLogin,
	onLogout,
	onLogoutPosts,
	onLogoutRooms,
	onLogoutUsers,
	onUserLogged,
	onCloseModal,
} from '../store';
import Swal from 'sweetalert2';

export const useAuthStore = () => {
	const { status, user, errorMessage, userLog } = useSelector(
		state => state.auth
	);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());
		try {
			const { data } = await hotelManagerApi.post('/auth/login', {
				email,
				password,
			});

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(
				onLogin({ name: data.name, uid: data.uid, role: data.role })
			);
			startGetUserLogin(data?.uid);
		} catch (error) {
			dispatch(onLogout('Credenciales incorrectas'));
			Swal.fire('Error en login', error?.response?.data?.msg, 'error');
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			return startLogout();
		}

		try {
			const { data } = await hotelManagerApi.get('/auth/renew');

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				onLogin({ name: data.name, uid: data.uid, role: data.role })
			);
			startGetUserLogin(data?.uid);
		} catch (error) {
			if (error?.response?.data?.msg === 'Token no valido') {
				navigate('/login');
			}
			Swal.fire('Token invalido', 'Inicia sesión de nuevo', 'error');
			startLogout();
		}
	};

	const startLogout = () => {
		localStorage.clear();

		// Eliminar los demas estados
		dispatch(onLogout());
		dispatch(onLogoutCompany());
		dispatch(onLogoutPosts());
		dispatch(onLogoutRooms());
		dispatch(onLogoutUsers());
		dispatch(onCloseModal());
	};

	const startRegisterAdmin = async ({
		name,
		surname,
		email,
		password,
		phone,
	}) => {
		try {
			const { data } = await hotelManagerApi.post('/auth/new-admin', {
				name,
				surname,
				email,
				password,
				phone,
			});
			const { userAdmin } = data;
			localStorage.setItem('token', data.token);
			dispatch(
				onLogin({
					name: userAdmin.name,
					uid: userAdmin.id,
					role: userAdmin.role,
				})
			);
			startGetUserLogin(userAdmin.id);
		} catch (error) {
			Swal.fire('Error en registro', error?.response?.data?.msg, 'error');
		}
	};

	const startRegisterUser = async user => {
		try {
			const { data } = await hotelManagerApi.post('/auth/new-user', user);

			localStorage.setItem('token', data.token);
			dispatch(
				onLogin({
					name: data.userName,
					uid: data.id,
					role: data.role,
				})
			);
		} catch (error) {
			Swal.fire('Error en registro', error?.response?.data?.msg, 'error');
		}
	};

	const startGetUserLogin = async id => {
		try {
			const { data } = await hotelManagerApi.get(`/auth/user/${id}`);

			dispatch(onUserLogged(data?.user));
		} catch (error) {
			dispatch(onLogout(error.response.data?.msg));
			Swal.fire('Error en login', error?.response?.data?.msg, 'error');
			return;
		}
	};

	const verifyUserPassword = async ({ email, password }) => {
		try {
			const { data } = await hotelManagerApi.post('/auth/login', {
				email,
				password,
			});

			return data;
		} catch (error) {
			Swal.fire(
				'Error al eliminar la epresa',
				error?.response?.data?.msg,
				'error'
			);
			return;
		}
	};

	return {
		//* Properties
		status,
		user,
		errorMessage,
		userLog,
		//* Methods
		startLogin,
		checkAuthToken,
		startLogout,
		startRegisterAdmin,
		startRegisterUser,
		startGetUserLogin,
		verifyUserPassword,
	};
};
