import Swal from 'sweetalert2';
import { useForm, useModalStore, useRoomStore } from '../../hooks';
import { usePostsStore } from '../../hooks/usePostsStore';
import { LayoutModal } from '../../hotelApp/Layouts';

const newPostForm = {
	namePost: '',
	description: '',
	nameRoomId: '',
	postStatus: '',
};

export const ModalFormPost = () => {
	const { rooms, roomActive } = useRoomStore();
	const { startCreatePost } = usePostsStore();
	const { namePost, description, nameRoomId, postStatus, onInputChange } =
		useForm(newPostForm);
	const { closeModal } = useModalStore();

	const onCreatePost = async e => {
		e.preventDefault();

		const resp = await startCreatePost({
			namePost,
			description,
			nameRoomId: roomActive?.nameRoom || nameRoomId,
			postStatus,
		});

		if (resp?.ok) {
			closeModal();
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Post creado con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const inputClass =
		'w-full text-lg border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none';

	return (
		<LayoutModal title='Nuevo Post'>
			<form onSubmit={onCreatePost} className='text-base sm:space-y-8'>
				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8'>
					<div className='flex flex-col gap-2 sm:gap-3'>
						<label className='text-lg font-semibold text-gray-800'>
							Título del post
						</label>
						<input
							name='namePost'
							value={namePost || ''}
							onChange={onInputChange}
							type='text'
							placeholder='Ej: Fuga en baño'
							required
							className={inputClass}
						/>
					</div>

					{/* Estado del post */}
					<div className='flex flex-col gap-2 sm:gap-3'>
						<label className='text-lg font-semibold text-gray-800'>
							Estado
						</label>
						<select
							name='postStatus'
							value={postStatus || ''}
							onChange={onInputChange}
							required
							className={inputClass}
						>
							<option value='' disabled>
								Status
							</option>
							<option value='PENDING'>Pending</option>
							<option value='URGENT'>Urgent</option>
							<option value='PROCESS'>Process</option>
							<option value='DONE'>Done</option>
						</select>
					</div>

					{/* Habitación */}
					<div className='flex flex-col gap-2 sm:gap-3'>
						<label className='text-lg font-semibold text-gray-800'>
							Habitación
						</label>
						<input
							list='nameRoomIds'
							name='nameRoomId'
							value={roomActive?.nameRoom || nameRoomId || ''}
							onChange={onInputChange}
							placeholder='Ej: 101A'
							required
							disabled={roomActive}
							className={inputClass}
						/>
						<datalist id='nameRoomIds'>
							{rooms?.length > 0 ? (
								rooms.map(room => (
									<option key={room.id} value={room.nameRoom}>
										{room.nameRoom}
									</option>
								))
							) : (
								<option value='No hay habitaciones disponibles' />
							)}
						</datalist>
					</div>

					{/* Descripción */}
					<div className='flex flex-col gap-2 sm:gap-3 sm:col-span-2'>
						<label className='text-lg font-semibold text-gray-800'>
							Descripción
						</label>
						<textarea
							name='description'
							value={description || ''}
							onChange={onInputChange}
							placeholder='Describe el problema con detalles...'
							maxLength={250}
							required
							className={`${inputClass} h-40 resize-none`}
						/>
						<div className='text-sm text-gray-500 text-right'>
							{description?.length || 0}/250 caracteres
						</div>
					</div>
				</div>

				{/* Botón de guardar */}
				<div className='flex justify-center'>
					<button
						type='submit'
						className='bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition'
					>
						Guardar
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
