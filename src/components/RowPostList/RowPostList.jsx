import { useAuthStore, useModalStore, usePostsStore } from '../../hooks';
import { DeleteIconSVG } from '../../ui/DeleteIconSVG';
import { EditIconSVG } from '../../ui/EditIconSVG';
import './RowPostList.css';

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
		openModal('edit');
	};

	return (
		<tr>
			{/* <td>{id}</td> */}
			<td>
				<span
					className={`status_badge_row_list ${postStatus.toLowerCase()}`}
				>
					{postStatus}
				</span>
			</td>

			<td>{new Date(createdAt).toLocaleDateString()}</td>
			<td>{nameRoomId}</td>
			<td>{namePost}</td>
			<td className='truncate_row_list'>{description}</td>
			<td>{authorName}</td>
			{/* <td>
				<span
					className={`status_badge_row_list ${postStatus.toLowerCase()}`}
				>
					{postStatus}
				</span>
			</td> */}

			<td>{solvedAt ? new Date(solvedAt).toLocaleDateString() : '-'}</td>

			<td>{solvedByName || '-'}</td>

			{authorById === userLog.id || userLog.role === 'SUPERADMIN' ? (
				<td className='container_buttons_options_list'>
					<EditIconSVG
						color='green'
						size={23}
						onClick={() => handleEditPost(post)}
					/>
					<DeleteIconSVG
						color='red'
						size={23}
						onClick={() => startRemovePost(id)}
					/>
				</td>
			) : userLog.role !== 'SUPERADMIN' ? (
				<td className='container_buttons_options_list'>
					<EditIconSVG
						color='green'
						size={23}
						onClick={() => handleEditPost(post)}
					/>
				</td>
			) : (
				<td>-</td>
			)}
		</tr>
	);
};
