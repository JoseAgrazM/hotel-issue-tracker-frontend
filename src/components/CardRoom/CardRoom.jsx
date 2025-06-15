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
				className={`p-4 rounded-xl shadow-md border-l-4 ${stateClass} bg-white hover:shadow-lg transition duration-300 flex flex-col justify-between`}
				style={{ height: '240px' }} // más compacta
			>
				<h3 className='text-xl font-bold text-gray-900 mb-2 flex items-center gap-2'>
					<span className='text-blue-600'>🛏️</span> {nameRoom}
				</h3>

				<div className='text-sm text-gray-700 space-y-1 flex-grow'>
					<p>
						<strong className='font-semibold text-gray-800'>
							Piso:
						</strong>{' '}
						{floor}
					</p>
					<p>
						<strong className='font-semibold text-gray-800'>
							Estado:
						</strong>{' '}
						<span className='capitalize'>{roomState}</span>
					</p>
					<p>
						<strong className='font-semibold text-gray-800'>
							Tipo:
						</strong>{' '}
						{typeRoom}
					</p>
					<p className='line-clamp-2'>
						<strong className='font-semibold text-gray-800'>
							Descripción:
						</strong>{' '}
						{description}
					</p>
				</div>
			</div>
		</NavLink>
	);
};
