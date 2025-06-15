import { useAuthStore, useModalStore, usePostsStore } from '@/hooks';
import { EditIconSVG, DeleteIconSVG } from '@/ui';
import { getPostStatus } from '../../helpers/getPostStatus';

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

	const handleEditPost = () => {
		startPostActive(post);
		openModal('editPost');
	};

	return (
		<tr className='hover:bg-gray-50 transition' role='row'>
			<td className='px-4 py-3' role='cell'>
				<span
					className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getPostStatus(
						postStatus
					)}`}
					aria-label={`Estado: ${postStatus}`}
				>
					{postStatus}
				</span>
			</td>

			<td
				className='px-4 py-3 text-base text-gray-700'
				role='cell'
				title={new Date(createdAt).toLocaleString()}
			>
				{new Date(createdAt).toLocaleDateString()}
			</td>

			<td
				className='px-4 py-3 text-base text-gray-700'
				role='cell'
				title={nameRoomId}
			>
				{nameRoomId}
			</td>

			<td
				className='px-4 py-3 text-base font-semibold text-gray-900'
				role='cell'
				title={namePost}
			>
				{namePost}
			</td>

			<td
				className='px-4 py-3 max-w-xs truncate text-base text-gray-600'
				role='cell'
				title={description}
			>
				{description}
			</td>

			<td
				className='px-4 py-3 text-base text-gray-700'
				role='cell'
				title={authorName}
			>
				{authorName}
			</td>

			<td
				className='px-4 py-3 text-base text-gray-700'
				role='cell'
				title={solvedAt ? new Date(solvedAt).toLocaleString() : '-'}
			>
				{solvedAt ? new Date(solvedAt).toLocaleDateString() : '-'}
			</td>

			<td
				className='px-4 py-3 text-base text-gray-700'
				role='cell'
				title={solvedByName || '-'}
			>
				{solvedByName || '-'}
			</td>

			<td className='px-4 py-3' role='cell'>
				<div className='flex gap-4 items-center'>
					{(authorById === userLog.id ||
						userLog.role === 'SUPERADMIN') && (
						<EditIconSVG
							color='green'
							size={28}
							className='cursor-pointer hover:scale-110 transition-transform'
							onClick={handleEditPost}
							role='button'
							aria-label={`Editar post ${namePost}`}
							tabIndex={0}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ')
									handleEditPost();
							}}
						/>
					)}

					{userLog.role === 'SUPERADMIN' && (
						<DeleteIconSVG
							color='red'
							size={28}
							className='cursor-pointer hover:scale-110 transition-transform'
							onClick={() => startRemovePost(id)}
							role='button'
							aria-label={`Eliminar post ${namePost}`}
							tabIndex={0}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ')
									startRemovePost(id);
							}}
						/>
					)}
				</div>
			</td>
		</tr>
	);
};
