import { useModalStore } from '@/hooks';
import './LayoutModal.css';

export const LayoutModal = ({ children, title }) => {
	const { closeModal } = useModalStore();

	return (
		<div className='modal-overlay'>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<div className='modal-header'>
					<h3>{title}</h3>
					<button className='button-close-modal' onClick={closeModal}>❌</button>
				</div>
				<div className='modal-body'>{children}</div>
			</div>
		</div>
	);
};
