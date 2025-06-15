import React from 'react';
import { useForm, useModalStore, useRoomStore } from '@/hooks';
import { LayoutModal } from '../../hotelApp/Layouts';
import Swal from 'sweetalert2';

export const ModalEditRoom = () => {
	const { roomActive, startEditRoom } = useRoomStore();
	const { closeModal } = useModalStore();

	const { nameRoom, floor, typeRoom, description, roomState, onInputChange } =
		useForm(roomActive);

	const onEditRoom = async e => {
		e.preventDefault();

		if (!Number.isInteger(Number(floor)) || Number(floor) <= 0) {
			return Swal.fire(
				'Error',
				'El piso debe ser un número entero positivo.',
				'error'
			);
		}

		const resp = await startEditRoom({
			...roomActive,
			nameRoom,
			floor,
			typeRoom,
			description,
			roomState,
		});

		if (resp?.ok) {
			closeModal();
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Habitación actualizada con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='Editar habitación'>
			<form
				onSubmit={onEditRoom}
				className='rounded-lg p-6 shadow-lg bg-white space-y-6'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='flex flex-col'>
						<label className='font-semibold mb-1'>Nombre</label>
						<p className='bg-gray-100 text-gray-700 py-2 px-3 rounded-md border border-gray-300'>
							{nameRoom || ''}
						</p>
					</div>

					<div className='flex flex-col'>
						<label htmlFor='floor' className='font-semibold mb-1'>
							Piso
						</label>
						<input
							id='floor'
							name='floor'
							value={floor || ''}
							onChange={onInputChange}
							className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400'
							type='number'
							min={1}
							step={1}
							placeholder='Número de piso'
							required
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='typeRoom'
							className='font-semibold mb-1'
						>
							Tipo de habitación
						</label>
						<select
							id='typeRoom'
							name='typeRoom'
							value={typeRoom || ''}
							onChange={onInputChange}
							className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400'
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

					<div className='flex flex-col'>
						<label
							htmlFor='roomState'
							className='font-semibold mb-1'
						>
							Estado
						</label>
						<select
							id='roomState'
							name='roomState'
							value={roomState || ''}
							onChange={onInputChange}
							className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400'
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
				</div>

				<div className='flex flex-col'>
					<label htmlFor='description' className='font-semibold mb-1'>
						Descripción
					</label>
					<textarea
						id='description'
						name='description'
						value={description || ''}
						onChange={onInputChange}
						className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none'
						rows={4}
						placeholder='Descripción de la habitación'
						required
					/>
				</div>

				<div className='text-right'>
					<button
						type='submit'
						className='bg-sky-600 text-white py-2 px-6 rounded-md hover:bg-sky-700 transition-colors font-semibold'
					>
						Guardar
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
