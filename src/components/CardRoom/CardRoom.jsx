import { NavLink } from 'react-router-dom';
import './CardRoom.css';
import { getRoomStateClass } from '../../helpers';

export const CardRoom = ({ room }) => {
	const { nameRoom, roomState, floor, description, typeRoom } = room;

	return (
		<NavLink className='link-card-room' to={`/room/${nameRoom}`}>
			<div
				className={`card_container_room ${getRoomStateClass(
					roomState
				)} `}
			>
				<h3 className='roomName_title'>{nameRoom}</h3>
				<div className='room_details'>
					<p>
						<strong>Floor: {floor}</strong>
					</p>
					<p>
						<strong>Description: {description}</strong>
					</p>
					<p>
						<strong>State: {roomState}</strong>
					</p>
					<p>
						<strong>Type: {typeRoom}</strong>
					</p>
				</div>
			</div>
		</NavLink>
	);
};
