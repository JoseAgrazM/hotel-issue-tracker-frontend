import { useEffect, useMemo, useState } from 'react';
import { LayoutPage } from '../../Layouts';
import { useModalStore, useRoomStore, useAuthStore } from '@/hooks';
import { GridRooms, ModalFormRoom, Navbar } from '@/components';

export const RoomsPage = () => {
	const { rooms, startLoadRooms } = useRoomStore();
	const { isModalOpen, openModal, modalType } = useModalStore();

	const [sortById, setSortById] = useState(false);
	const { userLog } = useAuthStore();
	const [filterRoom, setFilterRoom] = useState(null);

	const reverseRooms = useMemo(
		() => [...rooms].reverse().sort((a, b) => a.nameRoom - b.nameRoom),
		[rooms]
	);

	const toggleSortById = () => setSortById(prev => !prev);

	const filteredRoom = useMemo(() => {
		const searchTerm = filterRoom?.trim().toLowerCase();
		if (!searchTerm) return reverseRooms;
		return reverseRooms.filter(room =>
			room.nameRoom.toLowerCase().includes(searchTerm)
		);
	}, [reverseRooms, filterRoom]);

	const sortedRooms = useMemo(() => {
		if (sortById === null) return filteredRoom;
		return [...filteredRoom].sort((a, b) =>
			sortById ? a.nameRoom - b.nameRoom : b.nameRoom - a.nameRoom
		);
	}, [filteredRoom, sortById]);

	useEffect(() => {
		startLoadRooms();
	}, []);

	return (
		<>
			<Navbar />
			<LayoutPage title='Rooms'>
				<section className='flex flex-col mt-14 mx-9 md:flex-row flex-wrap gap-4 items-center justify-between mb-6'>
					<div className='flex gap-6'>
						{userLog?.role === 'SUPERADMIN' ||
						userLog?.role === 'RECEPTION' ? (
							<button
								onClick={() => openModal('create')}
								className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition'
							>
								Nueva habitación
							</button>
						) : (
							''
						)}

						<button
							onClick={toggleSortById}
							className='cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition border border-gray-300'
						>
							{sortById ? 'Mayor a Menor' : 'Menor a Mayor'}
						</button>
					</div>
					<div className='flex items-center gap-2 w-full md:w-auto'>
						<input
							type='text'
							value={filterRoom || ''}
							onChange={e => setFilterRoom(e.target.value)}
							placeholder='Busca por habitación'
							className='w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none'
						/>
						<button
							onClick={() => setFilterRoom('')}
							disabled={!filterRoom}
							className='cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50'
						>
							Limpiar
						</button>
					</div>
				</section>

				{isModalOpen && modalType === 'create' && <ModalFormRoom />}
				<GridRooms rooms={sortedRooms} />

				{rooms.length < 1 && (
					<h3 className='text-center text-gray-500 mt-8'>
						No hay habitaciones
					</h3>
				)}
			</LayoutPage>
		</>
	);
};
