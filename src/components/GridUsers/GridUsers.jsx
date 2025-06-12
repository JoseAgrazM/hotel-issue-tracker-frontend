import { memo } from 'react';
import { CardUser } from '../CardUser/CardUser';

export const GridUsers = memo(({ users = [] }) => {
	if (!users.length) {
		return (
			<div
				role='status'
				aria-live='polite'
				className='text-center text-gray-500 py-10'
			>
				No users found.
			</div>
		);
	}

	return (
		<div
			role='list'
			className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
		>
			{users.map(user => (
				<CardUser key={user.id} user={user} role='listitem' />
			))}
		</div>
	);
});
