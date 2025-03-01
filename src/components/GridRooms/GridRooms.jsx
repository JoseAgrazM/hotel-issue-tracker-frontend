import { CardRoom } from '../CardRoom/CardRoom';
import './GridRooms.css';

export const GridRooms = ({ rooms = [] }) => {
	return (
		<div className='grid_container_rooms'>
			{rooms?.map(room => (
				<CardRoom key={room.id} room={room} />
			))}
		</div>
	);
};
