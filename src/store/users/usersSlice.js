import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		isLoadingUsers: true,
		users: [],
		errorMessageUser: null,
		userActive: null,
	},
	reducers: {
		onAddNewUser: (state, { payload }) => {
			state.users.push(payload);
		},
		onLoadUsers: (state, { payload }) => {
			state.isLoadingUsers = false;
			state.users = [];
			payload.forEach(user => {
				state.users.push(user);

				// const exist = state.users.some(dbUser => dbUser.id === user.id);
				// if (!exist) state.users.push(user);
			});
		},
		onLogoutUsers: state => {
			state.isLoadingUsers = true;
			state.users = [];
			state.errorMessageUser = null;
		},
		clearErrorMessageUser: state => {
			state.errorMessageUser = null;
		},
		onDeleteUser: (state, { payload }) => {
			state.users = state.users.filter(user => user.id !== payload.id);
		},
		onSetActiveUser: (state, { payload }) => {
			state.userActive = payload;
		},

		onClearUserActive: state => {
			state.userActive = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onAddNewUser,
	onLogoutUsers,
	onLoadUsers,
	clearErrorMessageUser,
	onDeleteUser,
	onSetActiveUser,
	onClearUserActive,
} = usersSlice.actions;
