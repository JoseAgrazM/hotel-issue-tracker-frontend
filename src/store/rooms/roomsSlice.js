import { createSlice } from '@reduxjs/toolkit';

export const roomsSlice = createSlice({
	name: 'rooms',
	initialState: {
		isLoadingRooms: true,
		rooms: [],
		roomActive: null,
	},
	reducers: {
		onAddNewRoom: (state, { payload }) => {
			state.rooms.push(payload);
		},
		onLoadRooms: (state, { payload = [] }) => {
			state.isLoadingRooms = false;
			state.rooms = [];
			payload.forEach(room => {
				state.rooms.push(room);
				// 	const exist = state.rooms.some(dbRoom => dbRoom.id === room.id);

				// 	if (!exist) {
				// 		state.rooms.push(room);
				// 	}
			});
		},
		onLogoutRooms: state => {
			state.isLoadingRooms = false;
			state.rooms = [];
			state.roomActive = null;
		},
		onActiveRoom: (state, { payload }) => {
			state.isLoadingRooms = false;
			state.roomActive = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onAddNewRoom, onLoadRooms, onLogoutRooms, onActiveRoom } =
	roomsSlice.actions;
