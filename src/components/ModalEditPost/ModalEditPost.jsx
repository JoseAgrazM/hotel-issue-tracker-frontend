import React from 'react';
import {
	useForm,
	useModalStore,
	usePostsStore,
	useRoomStore,
} from '../../hooks';
import { LayoutModal } from '../../hotelApp/Layouts';
import Swal from 'sweetalert2';
import './ModalEditPost.css';

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
				title: 'Post actualizado con exito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='Edit post'>
			<form onSubmit={onEditPost} className='form-user-container'>
				<div className='container-section-form'>
					<section className='section-register-form'>
						<div className='form_post_group'>
							<label>Post name</label>
							<input
								name='namePost'
								value={namePost || ''}
								onChange={onInputChange}
								className='form-input'
								type='text'
								placeholder='Name post'
								required
								disabled={postActive.postStatus === 'DONE'}
							/>
						</div>
					</section>
					<section className='section-register-form'>
						<div className='form_post_group'>
							<label>Post status</label>
							<select
								name='postStatus'
								value={postStatus || ''}
								onChange={onInputChange}
								className='form-input'
								required
								disabled={postActive.postStatus === 'DONE'}
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
					</section>
					<section className='section-register-form'>
						<div className='form_post_group'>
							<label>Room</label>
							<input
								list='nameRoomIds'
								name='nameRoomId'
								value={nameRoomId || ''}
								onChange={onInputChange}
								className='form-input'
								placeholder='Room'
								required
								disabled={true}
							/>

							<datalist id='nameRoomIds'>
								{rooms?.map(room => (
									<option
										key={room.id}
										value={`${room.nameRoomId}`}
									>
										{`${room.nameRoomId}`}
									</option>
								))}
							</datalist>
						</div>
					</section>
				</div>
				<div className='form_room_group_description'>
					<label>Description</label>
					<textarea
						name='description'
						value={description || ''}
						onChange={onInputChange}
						className='form_input_description'
						type='text'
						placeholder='Describe lo ocurrido'
						maxLength='250'
						required
						disabled={postActive.postStatus === 'DONE'}
					/>
				</div>
				<div className='char_counter'>
					{description?.length || 0}/250 characters
				</div>
				<div className='form-user-group'>
					<input
						className='buttton_form_post_send'
						type='submit'
						value='Save'
						disabled={postActive.postStatus === 'DONE'}
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
