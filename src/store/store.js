import { configureStore } from '@reduxjs/toolkit';
import {
	authSlice,
	companySlice,
	modalSlice,
	postsSlice,
	roomsSlice,
	usersSlice,
} from './';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		rooms: roomsSlice.reducer,
		posts: postsSlice.reducer,
		users: usersSlice.reducer,
		company: companySlice.reducer,
		modal: modalSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
