import Swal from 'sweetalert2';
import { useForm, useModalStore, useRoomStore } from '../../hooks';
import { usePostsStore } from '../../hooks/usePostsStore';
import { LayoutModal } from '../../hotelApp/Layouts';
import './ModalFormPost.css';

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
				title: 'Post creado con exito!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<LayoutModal title='New Post'>
			<form onSubmit={onCreatePost} className='form_user_container'>
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
							/>
						</div>
						<div className='form_post_group'>
							<label>Post status</label>
							<select
								name='postStatus'
								value={postStatus || ''}
								onChange={onInputChange}
								className='form-input'
								required
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
								value={roomActive?.nameRoom || nameRoomId}
								onChange={onInputChange}
								className='form-input'
								placeholder='Room'
								required
								disabled={roomActive}
							/>

							<datalist id='nameRoomIds'>
								{rooms && rooms.length > 0 ? (
									rooms.map(room => (
										<option
											key={room.id}
											value={room.nameRoom}
										>
											{room.nameRoom}
										</option>
									))
								) : (
									<option value='No hay habitaciones' />
								)}
							</datalist>
						</div>
						<div className='form_post_group'>
							<label>Description</label>
							<textarea
								name='description'
								value={description || ''}
								onChange={onInputChange}
								className='form_input_description'
								type='text'
								placeholder='Describe lo ocurrido'
								required
							/>
						</div>
					</section>
				</div>
				<div className='form-user-group'>
					<input
						className='buttton-form-user-send'
						type='submit'
						value='Save'
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
