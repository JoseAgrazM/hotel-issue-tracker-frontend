import { useAuthStore, useModalStore, usePostsStore } from '@/hooks';
import { EditIconSVG, DeleteIconSVG } from '@/ui';

export const RowPostList = ({ post }) => {
	const {
		id,
		createdAt,
		namePost,
		description,
		authorName,
		postStatus,
		solvedAt,
		authorAdminId,
		authorId,
		solvedByName,
		nameRoomId,
	} = post;

	const authorById = authorId || authorAdminId;
	const { userLog } = useAuthStore();
	const { startRemovePost, startPostActive } = usePostsStore();
	const { openModal } = useModalStore();

	const handleEditPost = post => {
		startPostActive(post);
		openModal('editPost');
	};

	const getBadgeColor = status => {
		switch (status.toLowerCase()) {
			case 'pending':
				return 'bg-yellow-200 text-yellow-900';
			case 'process':
				return 'bg-blue-200 text-blue-900';
			case 'done':
				return 'bg-green-200 text-green-900';
			case 'urgent':
				return 'bg-red-200 text-red-900';
			default:
				return 'bg-gray-200 text-gray-900';
		}
	};

	return (
		<tr className='hover:bg-gray-50 transition'>
			<td className='px-4 py-3'>
				<span
					className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getBadgeColor(
						postStatus
					)}`}
				>
					{postStatus}
				</span>
			</td>

			<td className='px-4 py-3 text-base text-gray-700'>
				{new Date(createdAt).toLocaleDateString()}
			</td>

			<td className='px-4 py-3 text-base text-gray-700'>{nameRoomId}</td>

			<td className='px-4 py-3 text-base font-semibold text-gray-900'>
				{namePost}
			</td>

			<td className='px-4 py-3 max-w-xs truncate text-base text-gray-600'>
				{description}
			</td>

			<td className='px-4 py-3 text-base text-gray-700'>{authorName}</td>

			<td className='px-4 py-3 text-base text-gray-700'>
				{solvedAt ? new Date(solvedAt).toLocaleDateString() : '-'}
			</td>

			<td className='px-4 py-3 text-base text-gray-700'>
				{solvedByName || '-'}
			</td>

			<td className='px-4 py-3'>
				<div className='flex gap-4 items-center'>
					{(authorById === userLog.id ||
						userLog.role === 'SUPERADMIN') && (
						<EditIconSVG
							color='green'
							size={28} // icono más grande
							className='cursor-pointer hover:scale-110 transition-transform'
							onClick={() => handleEditPost(post)}
						/>
					)}

					{userLog.role === 'SUPERADMIN' && (
						<DeleteIconSVG
							color='red'
							size={28} // icono más grande
							className='cursor-pointer hover:scale-110 transition-transform'
							onClick={() => startRemovePost(id)}
						/>
					)}
				</div>
			</td>
		</tr>
	);
};
