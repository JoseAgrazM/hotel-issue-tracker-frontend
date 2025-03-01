import { memo } from 'react';
import { CardUser } from '../CardUser/CardUser';
import './GridUsers.css';

export const GridUsers = memo(({ users = [] }) => {
	return (
		<div className='grid_container_users'>
			{users?.map(user => (
				<CardUser key={user?.id} user={user} />
			))}
		</div>
	);
});
