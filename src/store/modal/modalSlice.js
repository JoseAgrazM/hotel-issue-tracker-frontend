import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isModalOpen: false,
		modalType: null, // 'create', 'edit', 'delete', null
	},
	reducers: {
		onOpenModal: (state, { payload }) => {
			state.isModalOpen = true;
			state.modalType = payload;
		},
		onCloseModal: state => {
			state.isModalOpen = false;
			state.modalType = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal } = modalSlice.actions;
