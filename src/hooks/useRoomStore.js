import { useDispatch, useSelector } from 'react-redux';
import {
	onActiveRoom,
	onLoadRooms,
	onLogoutRooms,
	onDeleteRoom,
} from '../store';
import { useCompanyStore } from './useCompanyStore';
import hotelManagerApi from '../api/HotelManagerApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const useRoomStore = () => {
	const { isLoadingRooms, rooms, roomActive } = useSelector(
		state => state.rooms
	);
	const { companyActive, startLoadCompanyActive } = useCompanyStore();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const startLoadRooms = async () => {
		if (!companyActive?.id) return;

		try {
			const { data } = await hotelManagerApi.get(
				`/room/${companyActive?.id}`
			);

			dispatch(onLoadRooms(data?.rooms));
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

	const startNewRooms = async newRooms => {
		if (newRooms.length < 1) return;
		if (!companyActive) return;

		const roomsWithCompanyId = newRooms.map(room => ({
			...room,
			companyId: companyActive.id,
			floor: Number(room.floor),
		}));

		try {
			const { data } = await hotelManagerApi.post(
				'/room/new',
				roomsWithCompanyId
			);

			startLoadCompanyActive(companyActive);
			return data;
		} catch (error) {
			Swal.fire(
				'Error en registro de habitación',
				error?.response?.data?.msg,
				'error'
			);
			return;
		}
	};

	const startActiveRoom = async roomId => {
		try {
			const { data } = await hotelManagerApi.get(
				`/room/${companyActive.id}/${roomId}`
			);

			if (!data?.room) throw new Error('Habitación no encontrada');

			dispatch(onActiveRoom(data?.room));
			startLoadCompanyActive(companyActive);
		} catch (error) {
			Swal.fire(
				'Error seleccionar la habitación',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startClearRooms = () => {
		dispatch(onLogoutRooms());
	};

	const clearRoomActive = () => {
		dispatch(onActiveRoom(null));
	};

	const startRemoveRoom = async id => {
		try {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete room!',
			}).then(async result => {
				if (result.isConfirmed) {
					const { data } = await hotelManagerApi.delete(
						`/room/${id}`
					);

					dispatch(onDeleteRoom(data.roomDelete));
					startLoadCompanyActive(companyActive);
					navigate('/rooms');
					Swal.fire({
						title: 'Deleted!',
						text: 'The room has been successfully deleted.',
						icon: 'success',
					});
				}
			});
		} catch (error) {
			Swal.fire(
				'Error al eliminar la habitación',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startEditRoom = async room => {
		try {
			const { data } = await hotelManagerApi.patch(`/room/${room.id}`, {
				room,
			});

			startActiveRoom(room.nameRoom);
			startLoadCompanyActive(companyActive);

			return data;
		} catch (error) {
			Swal.fire(
				'Error al editar la habitación',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	return {
		//* Properties
		isLoadingRooms,
		rooms,
		roomActive,
		//* Methods
		startNewRooms,
		startActiveRoom,
		clearRoomActive,
		startLoadRooms,
		startClearRooms,
		startRemoveRoom,
		startEditRoom,
	};
};
