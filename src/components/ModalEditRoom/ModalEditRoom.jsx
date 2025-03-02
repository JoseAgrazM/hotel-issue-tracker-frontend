import React from 'react';
import { useForm, useModalStore, useRoomStore } from '@/hooks';
import { LayoutModal } from '../../hotelApp/Layouts';
import Swal from 'sweetalert2';
import './ModalEditRoom.css';

export const ModalEditRoom = () => {
	const { roomActive, startEditRoom } = useRoomStore();

	const { closeModal } = useModalStore();

	const { nameRoom, floor, typeRoom, description, roomState, onInputChange } =
		useForm(roomActive);

	const updatedRoom = {
		...roomActive,
		nameRoom,
		floor,
		typeRoom,
		description,
		roomState,
	};

	const onEditRoom = async e => {
		e.preventDefault();

		const resp = await startEditRoom(updatedRoom);

		if (resp?.ok) {
			closeModal();

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Habitación actualizada con exito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='Edit post'>
			<form onSubmit={onEditRoom} className='form-user-container'>
				<div className='container-section-form'>
					<section className='section-register-form'>
						<div className='form_post_group'>
							<label>Name</label>
							<input
								name='nameRoom'
								value={nameRoom || ''}
								onChange={onInputChange}
								className={`form_input_rooms`}
								type='text'
								placeholder='Name room'
								required
								disabled
							/>
						</div>
						<div className='form_post_group'>
							<label>Floor</label>
							<input
								name='floor'
								value={floor || ''}
								onChange={onInputChange}
								className='form_input_rooms'
								type='number'
								required
							/>
						</div>
					</section>
					<section className='section-register-form'>
						<div className='form_post_group'>
							<label>Type room</label>
							<select
								name='typeRoom'
								value={typeRoom || ''}
								onChange={onInputChange}
								className='form_input_rooms'
								required
							>
								<option value='' disabled>
									Select a type
								</option>
								<option value='BASIC'>Basic</option>
								<option value='PREMIUM'>Premium</option>
								<option value='SUITE'>Suite</option>
							</select>
						</div>
						<div className='form_post_group'>
							<label>Post status</label>
							<select
								name='roomState'
								value={roomState || ''}
								onChange={onInputChange}
								className='form-input'
								required
							>
								<option value='' disabled>
									Select a state
								</option>
								<option value='AVAILABLE'>Available</option>
								<option value='OCCUPIED'>Occupied</option>
								<option value='BLOCKED'>Blocked</option>
							</select>
						</div>
					</section>
				</div>
				<div className='form_room_group_description'>
					<label>Description</label>
					<input
						name='description'
						value={description || ''}
						onChange={onInputChange}
						className='form_input_description'
						type='text'
						required
					/>
				</div>
				<div className='form-user-group'>
					<input
						className='buttton_form_post_send'
						type='submit'
						value='Save'
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
