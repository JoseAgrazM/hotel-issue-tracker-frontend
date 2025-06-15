import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <-- Importa useNavigate
import { useRoomStore, useModalStore, useAuthStore } from '@/hooks';
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

export const RoomIdPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { roomActive, startActiveRoom, clearRoomActive, startRemoveRoom } =
		useRoomStore();
	const { userLog } = useAuthStore();
	const { isModalOpen, modalType, openModal } = useModalStore();

	useEffect(() => {
		if (!id) return clearRoomActive();

		startActiveRoom(id);

		return () => clearRoomActive();
	}, [id, isModalOpen]);

	if (!roomActive) {
		return (
			<>
				<Navbar />
			</>
		);
	}

	const { posts = [], roomState, description, floor, typeRoom } = roomActive;

	const handleEditRoom = () => openModal('editRoom');
	const handleRemoveRoom = () => startRemoveRoom(roomActive.id);

	const handleBack = () => navigate('/rooms');

	return (
		<>
			<Navbar />

			<LayoutPage title={`Room ${id}`}>
				{isModalOpen && modalType === 'createPost' && <ModalFormPost />}
				{isModalOpen && modalType === 'editPost' && <ModalEditPost />}
				{isModalOpen && modalType === 'editRoom' && <ModalEditRoom />}
				<div className='max-w-7xl mx-auto px-4 mt-4'>
					<button
						onClick={handleBack}
						className='bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition'
					>
						← Volver a Rooms
					</button>
				</div>
				<div className='max-w-7xl mx-auto p-4 space-y-6'>
					<section
						className={`rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-md ${getRoomStateClass(
							roomState
						)}`}
					>
						<div className='space-y-2 text-gray-800'>
							<h2 className='text-3xl font-bold'>{roomState}</h2>
							<p>
								<span className='font-semibold'>Floor:</span>{' '}
								{floor}
							</p>
							<p>
								<span className='font-semibold'>Type:</span>{' '}
								{typeRoom}
							</p>
							<p>
								<span className='font-semibold'>
									Description:
								</span>{' '}
								{description}
							</p>
						</div>

						<div className='flex space-x-4 mt-4 md:mt-0'>
							{(userLog.role === 'SUPERADMIN' ||
								userLog.role === 'RECEPTION') && (
								<button
									onClick={handleEditRoom}
									aria-label='Edit Room'
									className='hover:text-blue-600 transition'
								>
									<EditIconSVG color='#3a7bff' size={40} />
								</button>
							)}

							{userLog.role === 'SUPERADMIN' && (
								<button
									onClick={handleRemoveRoom}
									aria-label='Delete Room'
									className='hover:text-red-600 transition'
								>
									<DeleteIconSVG color='#b20000' size={40} />
								</button>
							)}
						</div>
					</section>

					<section>
						{posts.length < 1 ? (
							<h3 className='text-center text-gray-500 text-lg'>
								No hay post en esta habitación
							</h3>
						) : (
							<ListPosts posts={posts} openModal={openModal} />
						)}
					</section>
				</div>
			</LayoutPage>
		</>
	);
};
