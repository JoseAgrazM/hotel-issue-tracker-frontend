import React from 'react';
import { useForm, useModalStore, useRoomStore } from '@/hooks';
import { LayoutModal } from '../../hotelApp/Layouts';
import Swal from 'sweetalert2';

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

		// Validación floor entero positivo
		if (!Number.isInteger(Number(floor)) || Number(floor) <= 0) {
			return Swal.fire(
				'Error',
				'El piso debe ser un número entero positivo',
				'error'
			);
		}

		const resp = await startEditRoom(updatedRoom);

		if (resp?.ok) {
			closeModal();
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Habitación actualizada con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='Editar habitación'>
			<form
				onSubmit={onEditRoom}
				className='form-user-container rounded-lg p-6 shadow-lg bg-white'
			>
				<div className='container-section-form flex flex-col gap-6'>
					<section className='section-register-form flex gap-6'>
						<div className='form_post_group flex flex-col flex-1'>
							<label className='font-semibold mb-1'>Nombre</label>
							<p className='form_input_rooms bg-gray-100 text-gray-700 py-2 px-3 rounded-md border border-gray-300'>
								{nameRoom || ''}
							</p>
						</div>
						<div className='form_post_group flex flex-col flex-1'>
							<label
								className='font-semibold mb-1'
								htmlFor='floor'
							>
								Piso
							</label>
							<input
								id='floor'
								name='floor'
								value={floor || ''}
								onChange={onInputChange}
								className='form_input_rooms border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400'
								type='number'
								placeholder='Número de piso'
								required
								min={1}
								step={1}
							/>
						</div>
					</section>

					<section className='section-register-form flex gap-6'>
						<div className='form_post_group flex flex-col flex-1'>
							<label
								className='font-semibold mb-1'
								htmlFor='typeRoom'
							>
								Tipo de habitación
							</label>
							<select
								id='typeRoom'
								name='typeRoom'
								value={typeRoom || ''}
								onChange={onInputChange}
								className='form_input_rooms border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400'
								required
							>
								<option value='' disabled>
									Seleccione un tipo
								</option>
								<option value='BASIC'>Básica</option>
								<option value='PREMIUM'>Premium</option>
								<option value='SUITE'>Suite</option>
							</select>
						</div>

						<div className='form_post_group flex flex-col flex-1'>
							<label
								className='font-semibold mb-1'
								htmlFor='roomState'
							>
								Estado
							</label>
							<select
								id='roomState'
								name='roomState'
								value={roomState || ''}
								onChange={onInputChange}
								className='form_input_rooms border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400'
								required
							>
								<option value='' disabled>
									Seleccione un estado
								</option>
								<option value='AVAILABLE'>Disponible</option>
								<option value='OCCUPIED'>Ocupada</option>
								<option value='BLOCKED'>Bloqueada</option>
							</select>
						</div>
					</section>
				</div>

				<div className='form_room_group_description flex flex-col mt-6'>
					<label className='font-semibold mb-1' htmlFor='description'>
						Descripción
					</label>
					<textarea
						id='description'
						name='description'
						value={description || ''}
						onChange={onInputChange}
						className='form_input_description border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none'
						placeholder='Descripción de la habitación'
						rows={4}
						required
					/>
				</div>

				<div className='form-user-group mt-6 text-right'>
					<button
						type='submit'
						className='buttton_form_post_send bg-sky-600 text-white py-2 px-6 rounded-md hover:bg-sky-700 transition-colors font-semibold'
					>
						Guardar
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
