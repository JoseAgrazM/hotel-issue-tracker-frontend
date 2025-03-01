import { useEffect, useMemo, useState } from 'react';
import { LayoutPage } from '../../Layouts';
import { useModalStore, useRoomStore } from '@/hooks';
import { GridRooms, ModalFormRoom, Navbar } from '@/components';
import './roomsPage.css';

export const RoomsPage = () => {
	const { rooms, startLoadRooms } = useRoomStore();
	const { isModalOpen, openModal, modalType } = useModalStore();

	const [sortById, setSortById] = useState(false);
	const [filterRoom, setFilterRoom] = useState(null);
	const reverseRooms = useMemo(
		() => [...rooms].reverse().sort((a, b) => a.nameRoom - b.nameRoom),
		[rooms]
	);

	const toggleSortById = () => {
		setSortById(prevState => !prevState);
	};

	const filteredRoom = useMemo(() => {
		const searchTerm = filterRoom?.trim().toLowerCase();
		if (!searchTerm) return reverseRooms;

		return reverseRooms.filter(room =>
			room.nameRoom.toLowerCase().includes(searchTerm)
		);
	}, [reverseRooms, filterRoom]);

	const sortedRooms = useMemo(() => {
		if (sortById === null) return filteredRoom; // No ordenar

		return [...filteredRoom].sort(
			(a, b) =>
				sortById
					? a.nameRoom - b.nameRoom // Ascendente
					: b.nameRoom - a.nameRoom // Descendente
		);
	}, [filteredRoom, sortById]);

	useEffect(() => {
		startLoadRooms();
	}, []);

	return (
		<>
			<Navbar />
			<LayoutPage title='Rooms'>
				<section className='container_room_options_filter_list'>
					<button
						onClick={() => openModal('create')}
						className='button_new_room'
					>
						New Room
					</button>
					<button
						onClick={toggleSortById}
						className='button_sort_post'
					>
						{sortById ? 'Mayor a Menor' : 'Menor a Mayor'}
					</button>

					<div className='container_input_button_room'>
						<input
							type='text'
							value={filterRoom || ''}
							onChange={e => {
								setFilterRoom(e.target.value);
							}}
							placeholder='Busca por habitación'
							className='input_search_room'
						/>
						<button
							className='button_clear_filter_room'
							onClick={() => setFilterRoom('')}
							disabled={!filterRoom}
						>
							Clear filter
						</button>
					</div>
				</section>

				{isModalOpen && modalType === 'create' && <ModalFormRoom />}
				<GridRooms rooms={sortedRooms} />

				{rooms.length < 1 && <h3>No hay habitaciones</h3>}
			</LayoutPage>
		</>
	);
};
