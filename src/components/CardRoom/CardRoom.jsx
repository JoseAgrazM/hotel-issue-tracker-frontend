import { NavLink } from 'react-router-dom';
import { getRoomStateClass } from '../../helpers';

export const CardRoom = ({ room }) => {
	const { nameRoom, roomState, floor, description, typeRoom } = room;

	const stateClass = getRoomStateClass(roomState);

	return (
		<NavLink
			to={`/rooms/${nameRoom}`}
			className='block transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl'
		>
			<div
				className={`p-6 rounded-xl shadow-lg border-l-6 ${stateClass} bg-white hover:shadow-xl transition duration-300 flex flex-col justify-between`}
				style={{ height: '280px' }} // Altura fija para todas las cards
			>
				<h3 className='text-2xl font-extrabold text-gray-900 mb-3 flex items-center gap-2'>
					<span className='text-blue-600'>🛏️</span> {nameRoom}
				</h3>
				<div className='text-base text-gray-700 space-y-2 leading-relaxed flex-grow'>
					<p>
						<strong className='font-semibold text-gray-800'>
							Floor:
						</strong>{' '}
						{floor}
					</p>

					<p>
						<strong className='font-semibold text-gray-800'>
							State:
						</strong>{' '}
						<span className='capitalize'>{roomState}</span>
					</p>
					<p>
						<strong className='font-semibold text-gray-800'>
							Type:
						</strong>{' '}
						{typeRoom}
					</p>
					<p className='line-clamp-3'>
						<strong className='font-semibold text-gray-800'>
							Description:
						</strong>{' '}
						{description}
					</p>
				</div>
			</div>
		</NavLink>
	);
};
