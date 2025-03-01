import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		status: 'checking', // authenticated, not-authenticated
		user: {},
		errorMessage: undefined,
		userLog: {},
	},
	reducers: {
		onChecking: state => {
			state.status = 'checking';
			state.user = {};
			state.errorMessage = undefined;
		},
		onLogin: (state, { payload }) => {
			state.status = 'authenticated';
			state.user = payload;
			state.errorMessage = undefined;
		},
		onLogout: (state, { payload }) => {
			state.status = 'not-authenticated';
			state.user = {};
			state.userLog = {};
			state.errorMessage = payload;
		},
		clearErrorMessage: state => {
			state.errorMessage = undefined;
		},
		onUserLogged: (state, { payload }) => {
			state.userLog = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onChecking,
	onLogin,
	onLogout,
	clearErrorMessage,
	onUserLogged,
} = authSlice.actions;
