import { useAuthStore, useModalStore, usePostsStore } from '@/hooks';
import { EditIconSVG, DeleteIconSVG } from '@/ui';
import { getPostStatus } from '../../helpers/getPostStatus';

export const CardPostMobile = ({ sortedPosts }) => {
	const { userLog } = useAuthStore();
	const { openModal } = useModalStore();
	const { startRemovePost, startPostActive } = usePostsStore();

	const handleEditPost = post => {
		startPostActive(post);
		openModal('editPost');
	};

	return (
		<div className='md:hidden space-y-5 p-4 bg-gray-50'>
			{sortedPosts.map(post => {
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

				return (
					<article
						key={id}
						className='bg-white rounded-xl shadow-md p-5 space-y-3 border border-gray-200 hover:shadow-lg transition'
						aria-label={`Post titled ${namePost}`}
					>
						<header className='flex justify-between items-center'>
							<span
								className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPostStatus(
									postStatus
								)}`}
								aria-label={`Estado: ${postStatus}`}
							>
								{postStatus}
							</span>

							<div className='flex gap-4 text-xl text-gray-600'>
								{
									<EditIconSVG
										color='green'
										size={24}
										className='cursor-pointer hover:scale-110 transition-transform'
										onClick={() => handleEditPost(post)}
										role='button'
										aria-label={`Editar post ${namePost}`}
										tabIndex={0}
										onKeyDown={e => {
											if (
												e.key === 'Enter' ||
												e.key === ' '
											)
												handleEditPost(post);
										}}
									/>
								}

								{authorById === userLog.id ||
								userLog.role === 'SUPERADMIN' ? (
									<DeleteIconSVG
										color='red'
										size={24}
										className='cursor-pointer hover:scale-110 transition-transform'
										onClick={() => startRemovePost(id)}
										role='button'
										aria-label={`Eliminar post ${namePost}`}
										tabIndex={0}
										onKeyDown={e => {
											if (
												e.key === 'Enter' ||
												e.key === ' '
											)
												startRemovePost(id);
										}}
									/>
								) : (
									''
								)}
							</div>
						</header>

						<section className='text-sm text-gray-700 space-y-1'>
							<p>
								<strong>Fecha:</strong>{' '}
								{new Date(createdAt).toLocaleDateString()}
							</p>
							<p>
								<strong>Habitación:</strong> {nameRoomId}
							</p>
							<p>
								<strong>Nombre:</strong> {namePost}
							</p>
							<p className='truncate' title={description}>
								<strong>Descripción:</strong> {description}
							</p>
							<p>
								<strong>Autor:</strong> {authorName}
							</p>
							<p>
								<strong>Resuelto:</strong>{' '}
								{solvedAt
									? new Date(solvedAt).toLocaleDateString()
									: '-'}
							</p>
							<p>
								<strong>Completado por:</strong>{' '}
								{solvedByName || '-'}
							</p>
						</section>
					</article>
				);
			})}
		</div>
	);
};
