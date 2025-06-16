import {
	useForm,
	useModalStore,
	usePostsStore,
	useRoomStore,
} from '../../hooks';
import { LayoutModal } from '../../hotelApp/Layouts';
import Swal from 'sweetalert2';

export const ModalEditPost = () => {
	const { rooms } = useRoomStore();
	const { postActive, startEditPost } = usePostsStore();
	const { closeModal } = useModalStore();

	const { namePost, description, postStatus, nameRoomId, onInputChange } =
		useForm(postActive);

	const updatedPost = {
		...postActive,
		namePost,
		description,
		postStatus,
		nameRoomId,
	};

	const onEditPost = async e => {
		e.preventDefault();

		const resp = await startEditPost(updatedPost);

		if (resp?.ok) {
			closeModal();
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Post actualizado con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const inputClass =
		'w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:outline-none';

	const isDisabled = postActive.postStatus === 'DONE';

	return (
		<LayoutModal title='Editar post'>
			<form onSubmit={onEditPost} className='space-y-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='flex flex-col gap-1'>
						<label className='text-sm font-medium text-gray-700'>
							Nombre del post
						</label>
						<input
							name='namePost'
							value={namePost || ''}
							onChange={onInputChange}
							type='text'
							placeholder='Nombre'
							className={inputClass}
							required
							disabled={isDisabled}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label className='text-sm font-medium text-gray-700'>
							Estado
						</label>
						<select
							name='postStatus'
							value={postStatus || ''}
							onChange={onInputChange}
							className={inputClass}
							required
							disabled={isDisabled}
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

					<div className='flex flex-col gap-1 md:col-span-2'>
						<label className='text-sm font-medium text-gray-700'>
							Habitación
						</label>
						<input
							list='nameRoomIds'
							name='nameRoomId'
							value={nameRoomId || ''}
							onChange={onInputChange}
							placeholder='ID de habitación'
							className={inputClass}
							required
							disabled
						/>
						<datalist id='nameRoomIds'>
							{rooms?.map(room => (
								<option key={room.id} value={room.nameRoomId}>
									{room.nameRoomId}
								</option>
							))}
						</datalist>
					</div>
				</div>

				<div className='flex flex-col gap-1'>
					<label className='text-sm font-medium text-gray-700'>
						Descripción
					</label>
					<textarea
						name='description'
						value={description || ''}
						onChange={onInputChange}
						placeholder='Describe lo ocurrido...'
						maxLength={250}
						className={`${inputClass} h-28 resize-none`}
						required
						disabled={isDisabled}
					/>
					<div className='text-xs text-right text-gray-500'>
						{description?.length || 0}/250 caracteres
					</div>
				</div>

				<div className='flex justify-center'>
					<input
						type='submit'
						value='Guardar'
						disabled={isDisabled}
						className={` ${
							isDisabled ? 'bg-gray-500' : 'bg-sky-600'
						} text-white text-base font-medium px-4 py-2 rounded hover:bg-sky-700 transition disabled:opacity-50 cursor-pointer`}
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
