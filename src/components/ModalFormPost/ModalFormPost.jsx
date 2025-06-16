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
		'w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none';

	return (
		<LayoutModal title='Nuevo post'>
			<form onSubmit={onCreatePost} className='space-y-4 text-sm'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div className='flex flex-col gap-1'>
						<label className='font-medium text-gray-700'>
							Título
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

					<div className='flex flex-col gap-1'>
						<label className='font-medium text-gray-700'>
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
								Seleccionar estado
							</option>
							<option value='PENDING'>Pendiente</option>
							<option value='URGENT'>Urgente</option>
							<option value='PROCESS'>En proceso</option>
							<option value='DONE'>Hecho</option>
						</select>
					</div>

					<div className='flex flex-col gap-1 sm:col-span-2'>
						<label className='font-medium text-gray-700'>
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

					<div className='flex flex-col gap-1 sm:col-span-2'>
						<label className='font-medium text-gray-700'>
							Descripción
						</label>
						<textarea
							name='description'
							value={description || ''}
							onChange={onInputChange}
							placeholder='Describe el problema con detalles...'
							maxLength={250}
							required
							className={`${inputClass} h-32 resize-none`}
						/>
						<div className='text-xs text-right text-gray-500'>
							{description?.length || 0}/250 caracteres
						</div>
					</div>
				</div>

				<div className='flex justify-center'>
					<button
						type='submit'
						className='bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition'
					>
						Guardar
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
