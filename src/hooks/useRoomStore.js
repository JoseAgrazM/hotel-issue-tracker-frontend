import { useDispatch, useSelector } from 'react-redux';
import { onActiveRoom, onLoadRooms, onLogoutRooms } from '../store';
import { useCompanyStore } from './useCompanyStore';
import hotelManagerApi from '../api/HotelManagerApi';
import Swal from 'sweetalert2';

export const useRoomStore = () => {
	const { isLoadingRooms, rooms, roomActive } = useSelector(
		state => state.rooms
	);
	const { companyActive, startLoadCompanyActive } = useCompanyStore();
	const dispatch = useDispatch();

	const startLoadRooms = async () => {
		if (!companyActive?.id) return;

		try {
			const { data } = await hotelManagerApi.get(
				`/room/${companyActive?.id}`
			);

			dispatch(onLoadRooms(data?.rooms));
		} catch (error) {
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
			return;
		}
	};

	const startClearRooms = () => {
		dispatch(onLogoutRooms());
	};

	const clearRoomActive = () => {
		dispatch(onActiveRoom(null));
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
	};
};
