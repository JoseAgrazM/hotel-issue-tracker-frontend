import { getPostStatus } from '../../helpers';

export const CardLastPost = ({ post, isLast }) => {
	const { namePost, description, authorName, postStatus, nameRoomId } = post;

	const status = getPostStatus(postStatus);

	return (
		<div className='last_post_wrap p-4'>
			<article
				className={`last_post rounded-lg shadow-md p-5 space-y-4 transition
			${isLast ? 'border-2 border-blue-500 bg-blue-50' : `${status}`}
			`}
			>
				<header className='flex flex-col md:flex-row md:justify-between md:items-center'>
					<div className='truncate max-w-full'>
						<span className='author_label text-sm font-semibold text-gray-600'>
							Title:
						</span>
						<h3 className='card_title text-xl font-bold text-gray-800 truncate max-w-full'>
							{namePost}
						</h3>
					</div>
					<span className='card_room text-sm md:text-base text-gray-700 mt-2 md:mt-0 truncate max-w-full'>
						Room: <strong>{nameRoomId}</strong>
					</span>
				</header>

				<section className='card_description text-gray-700 text-sm md:text-base truncate max-w-full overflow-hidden whitespace-nowrap'>
					<p>{description}</p>
				</section>

				<footer className='card_footer border-t pt-3 mt-3 text-sm md:text-base flex justify-between items-center'>
					<div className='author_info text-gray-600 truncate max-w-[70%]'>
						<span className='author_label font-semibold'>
							Author:
						</span>{' '}
						<span className='author_name font-semibold text-gray-800 truncate max-w-full'>
							{authorName}
						</span>
					</div>
					<span className='post_status capitalize font-semibold text-xs md:text-sm text-gray-500 truncate max-w-[30%]'>
						Status: {postStatus}
					</span>
				</footer>
			</article>
		</div>
	);
};
