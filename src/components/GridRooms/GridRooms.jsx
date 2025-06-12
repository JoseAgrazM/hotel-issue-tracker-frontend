import { CardRoom } from '../CardRoom/CardRoom';

export const GridRooms = ({ rooms = [] }) => {
	return (
		<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4'>
			{rooms.map(room => (
				<CardRoom key={room.id} room={room} />
			))}
		</div>
	);
};
