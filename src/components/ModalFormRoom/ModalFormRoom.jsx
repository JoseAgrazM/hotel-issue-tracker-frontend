import { useState } from 'react';
import { LayoutModal } from '../../hotelApp/Layouts';
import { RowRoomForm } from '../RowRoomForm/RowRoomForm';
import { useModalStore, useRoomStore } from '../../hooks';
import Swal from 'sweetalert2';
import './ModalFormRoom.css';

const newRoomForm = {
	nameRoom: '',
	floor: '',
	description: '',
	typeRoom: '',
};

export const ModalFormRoom = () => {
	const [rooms, setRooms] = useState([newRoomForm]);
	const { closeModal } = useModalStore();
	const { startNewRooms } = useRoomStore();

	const onInputChange = (index, e) => {
		const { name, value } = e.target;
		const updatedRooms = [...rooms];
		updatedRooms[index] = { ...updatedRooms[index], [name]: value };
		setRooms(updatedRooms);
	};

	// Función para agregar una nueva fila de inputs
	const newRowRoom = e => {
		e.preventDefault();
		setRooms([
			...rooms,
			{ nameRoom: '', floor: '', description: '', typeRoom: '' },
		]);
	};

	const onRemoveRowForm = (e, index) => {
		e.preventDefault();
		setRooms(prevRooms => prevRooms.filter((_, i) => i !== index));
	};

	const onCreateRooms = async e => {
		e.preventDefault();
		if (rooms.length < 1) return;

		const resp = await startNewRooms(rooms);

		if (resp?.ok && rooms.length > 1) {
			closeModal();
		}
		if (resp?.ok && rooms.length === 1) {
			closeModal();
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Habitación creada con exito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	if (rooms.length === 0) {
		closeModal();
	}

	return (
		<LayoutModal title='Crear habitación'>
			<form onSubmit={onCreateRooms} className='md:form-rooms-container'>
				<div className='container-section-form form-room'>
					{rooms.map((room, index) => (
						<RowRoomForm
							key={index}
							room={room}
							index={index}
							onInputChange={onInputChange}
							onRemoveRowForm={onRemoveRowForm}
						/>
					))}
				</div>
				<div className='form-room-group'>
					<button className='add-new-room' onClick={newRowRoom}>
						Añadir habitación
					</button>
					<input
						className='buttton-form-room-send'
						type='submit'
						value='Crear'
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
