import { getPostStatus } from '../../helpers';

export const CardLastPost = ({ post, isLast }) => {
	const { namePost, description, authorName, postStatus, nameRoomId } = post;

	const status = getPostStatus(postStatus);

	return (
		<div className='p-4'>
			<article
				className={`rounded-lg shadow-md p-5 space-y-4 transition
					${isLast ? 'border-2 border-blue-500 bg-blue-50' : status}`}
			>
				<header className='flex flex-col md:flex-row md:justify-between md:items-center'>
					<div className='max-w-full'>
						<span className='text-sm font-semibold text-gray-600'>
							Título:
						</span>
						<h3 className='text-xl font-bold text-gray-800 max-w-full'>
							{namePost}
						</h3>
					</div>
					<span className='text-sm md:text-base text-gray-700 mt-2 md:mt-0 max-w-full'>
						Habitación: <strong>{nameRoomId}</strong>
					</span>
				</header>

				<section className='text-gray-700 text-sm md:text-base truncate max-w-full overflow-hidden whitespace-nowrap'>
					<p>{description}</p>
				</section>

				<footer className='border-t pt-3 mt-3 text-sm md:text-base flex justify-between items-center'>
					<div className='text-gray-600 max-w-[70%]'>
						<span className='font-semibold'>Author:</span>{' '}
						<span className='font-semibold text-gray-800 max-w-full'>
							{authorName}
						</span>
					</div>
					<span className='capitalize font-semibold text-xs md:text-sm text-gray-500 max-w-[30%]'>
						Estado: {postStatus}
					</span>
				</footer>
			</article>
		</div>
	);
};
