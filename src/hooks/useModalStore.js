import { useDispatch, useSelector } from 'react-redux';
import { onCloseModal, onOpenModal } from '../store';
import { useUsersStore } from './useUsersStore';

export const useModalStore = () => {
	const { isModalOpen, modalType } = useSelector(state => state.modal);
	const dispatch = useDispatch();

	const { startClearUserActive } = useUsersStore();

	const openModal = type => {
		dispatch(onOpenModal(type));
	};

	const closeModal = () => {
		dispatch(onCloseModal());
		startClearUserActive();
	};

	const toggleModal = () => {
		isModalOpen ? openModal() : closeModal();
	};
	return {
		isModalOpen,
		modalType,
		openModal,
		closeModal,
		toggleModal,
	};
};
