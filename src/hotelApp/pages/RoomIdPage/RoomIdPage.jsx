import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomStore } from '@/hooks';
import { ListPosts, Navbar } from '@/components';
import { getRoomStateClass } from '@/helpers';
import { LayoutPage } from '../../Layouts';
import './RoomIdPage.css';
import { ModalEditPost, ModalFormPost } from '../../../components';
import { useModalStore } from '../../../hooks';

export const RoomIdPage = () => {
	const { id } = useParams();
	const { roomActive, startActiveRoom, clearRoomActive } = useRoomStore();
	const { isModalOpen, modalType } = useModalStore();

	useEffect(() => {
		if (!id) return clearRoomActive();

		startActiveRoom(id);

		return () => {
			clearRoomActive();
		};
	}, [id]);

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
				{isModalOpen && modalType === 'create' && <ModalFormPost />}
				{isModalOpen && modalType === 'edit' && <ModalEditPost />}
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
					</section>
					<section className='div2'>
						{posts < 1 ? (
							<h3>No hay post en esta habitación</h3>
						) : (
							<ListPosts posts={posts} />
						)}
					</section>
				</div>
			</LayoutPage>
			;
		</>
	);
};
