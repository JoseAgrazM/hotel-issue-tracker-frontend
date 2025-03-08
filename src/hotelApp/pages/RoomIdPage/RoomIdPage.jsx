import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	useRoomStore,
	useModalStore,
	useAuthStore,
	usePostsStore,
} from '@/hooks';
import {
	ListPosts,
	Navbar,
	ModalEditPost,
	ModalFormPost,
	ModalEditRoom,
} from '@/components';
import { getRoomStateClass } from '@/helpers';
import { LayoutPage } from '../../Layouts';
import { EditIconSVG, DeleteIconSVG } from '@/ui';
import './RoomIdPage.css';

export const RoomIdPage = () => {
	const { id } = useParams();
	const { roomActive, startActiveRoom, clearRoomActive, startRemoveRoom } =
		useRoomStore();
	const { userLog } = useAuthStore();
	const {} = usePostsStore();

	const { isModalOpen, modalType, openModal } = useModalStore();

	const handleEditRoom = () => {
		openModal('editRoom');
	};

	const handleRemoveRoom = id => {
		startRemoveRoom(id);
	};

	useEffect(() => {
		if (!id) return clearRoomActive();

		startActiveRoom(id);

		return () => {
			clearRoomActive();
		};
	}, [id, isModalOpen]);

	if (!roomActive) {
		return (
			<>
				<Navbar />
			</>
		);
	}
	const { posts, roomState, description, floor, typeRoom } = roomActive;

	return (
		<>
			<Navbar />
			<LayoutPage title={`Room ${id}`}>
				{isModalOpen && modalType === 'createPost' && <ModalFormPost />}
				{isModalOpen && modalType === 'editPost' && <ModalEditPost />}
				{isModalOpen && modalType === 'editRoom' && <ModalEditRoom />}

				<div className='room_id_container'>
					<section
						className={`header_container ${getRoomStateClass(
							roomState
						)}`}
					>
						<div className={`header_room`}>
							<h2>{roomState}</h2>
							<p>Floor: {floor}</p>
							<p>Type: {typeRoom}</p>
							<p>Description: {description}</p>
						</div>
						<div className={`options_room`}>
							{(userLog.role === 'SUPERADMIN' ||
								userLog.role === 'RECEPTION') && (
								<EditIconSVG
									className='button_edit_room'
									color='#3a7bff'
									size={40}
									onClick={() => handleEditRoom(id)}
								/>
							)}

							{userLog.role === 'SUPERADMIN' && (
								<DeleteIconSVG
									className='button_delete_room'
									color='#b20000'
									size={40}
									onClick={() =>
										handleRemoveRoom(roomActive.id)
									}
								/>
							)}
						</div>
					</section>
					<section className='div2'>
						{posts < 1 ? (
							<h3>No hay post en esta habitación</h3>
						) : (
							<ListPosts posts={posts} openModal={openModal} />
						)}
					</section>
				</div>
			</LayoutPage>
			;
		</>
	);
};
