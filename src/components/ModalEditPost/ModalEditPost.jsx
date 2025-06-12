import React from 'react';
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
				title: 'Post actualizado con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const inputClass =
		'w-full text-base border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none';

	const isDisabled = postStatus === 'DONE';

	return (
		<LayoutModal title='Edit post'>
			<form onSubmit={onEditPost} className='space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Nombre del post */}
					<div className='flex flex-col gap-2'>
						<label className='text-base font-medium text-gray-800'>
							Post name
						</label>
						<input
							name='namePost'
							value={namePost || ''}
							onChange={onInputChange}
							type='text'
							placeholder='Name post'
							className={inputClass}
							required
							disabled={isDisabled}
						/>
					</div>

					{/* Estado del post */}
					<div className='flex flex-col gap-2'>
						<label className='text-base font-medium text-gray-800'>
							Post status
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
								Status
							</option>
							<option value='PENDING'>Pending</option>
							<option value='URGENT'>Urgent</option>
							<option value='PROCESS'>Process</option>
							<option value='DONE'>Done</option>
						</select>
					</div>

					{/* Habitación */}
					<div className='flex flex-col gap-2'>
						<label className='text-base font-medium text-gray-800'>
							Room
						</label>
						<input
							list='nameRoomIds'
							name='nameRoomId'
							value={nameRoomId || ''}
							onChange={onInputChange}
							placeholder='Room'
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

				{/* Descripción */}
				<div className='flex flex-col gap-2'>
					<label className='text-base font-medium text-gray-800'>
						Description
					</label>
					<textarea
						name='description'
						value={description || ''}
						onChange={onInputChange}
						placeholder='Describe lo ocurrido'
						maxLength={250}
						className={`${inputClass} h-36 resize-none`}
						required
						disabled={isDisabled}
					/>
					<div className='text-sm text-gray-500 text-right'>
						{description?.length || 0}/250 characters
					</div>
				</div>

				{/* Botón guardar */}
				<div className='flex justify-center'>
					<input
						type='submit'
						value='Save'
						disabled={isDisabled}
						className= {` bg-sky-600 text-white text-2xl font-semibold px-6 py-3 rounded-lg hover:bg-sky-700 transition cursor-pointer disabled:opacity-50`}
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
