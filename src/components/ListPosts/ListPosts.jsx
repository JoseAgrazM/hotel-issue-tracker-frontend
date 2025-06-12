import { useMemo, useState } from 'react';
import { RowPostList } from '../RowPostList/RowPostList';

export const ListPosts = ({ posts = [], openModal }) => {
	const [sortById, setSortById] = useState(false);
	const reversePost = [...posts].reverse();
	const [filterTitle, setFilterTitle] = useState('');

	const toggleSortById = () => {
		setSortById(prev => !prev);
	};

	const filteredPost = useMemo(() => {
		const searchTerm = filterTitle.trim().toLowerCase();
		if (!searchTerm) return reversePost;

		return reversePost.filter(post =>
			post.namePost.toLowerCase().includes(searchTerm)
		);
	}, [reversePost, filterTitle]);

	const sortedPost = useMemo(() => {
		return sortById
			? [...filteredPost].sort((a, b) => a.id - b.id)
			: filteredPost;
	}, [filteredPost, sortById]);

	return (
		<div className='space-y-8 w-full'>
			<section className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div className='flex flex-wrap gap-4'>
					<button
						onClick={() => openModal('createPost')}
						className='cursor-pointer bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition'
					>
						New Post
					</button>

					<button
						onClick={toggleSortById}
						className='cursor-pointer bg-white border border-gray-300 px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition'
					>
						{sortById ? 'Más antiguo' : 'Más reciente'}
					</button>
				</div>

				<div className='flex gap-2 mt-2 md:mt-0'>
					<input
						type='text'
						value={filterTitle}
						onChange={e => setFilterTitle(e.target.value)}
						placeholder='Busca por título'
						className='px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 w-full md:w-64'
					/>
					<button
						className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50'
						onClick={() => setFilterTitle('')}
						disabled={!filterTitle}
					>
						Clear
					</button>
				</div>
			</section>

			{/* Contenido */}
			{posts.length < 1 ? (
				<div className='text-center text-gray-500 text-lg font-medium bg-gray-100 rounded-lg p-6 shadow-sm'>
					Debes crear habitaciones antes para poder asignarles un
					post.
				</div>
			) : (
				<div className='overflow-x-auto rounded-xl shadow-sm bg-white'>
					<table className='min-w-[900px] w-full divide-y divide-gray-200 text-base text-left'>
						<thead className='bg-gray-50 text-gray-700 uppercase font-semibold tracking-wider text-sm md:text-base'>
							<tr>
								<th className='px-4 py-3'>Status</th>
								<th className='px-4 py-3'>Created</th>
								<th className='px-4 py-3'>Room</th>
								<th className='px-4 py-3'>Title</th>
								<th className='px-4 py-3'>Description</th>
								<th className='px-4 py-3'>Created By</th>
								<th className='px-4 py-3'>Resolved</th>
								<th className='px-4 py-3'>Completed By</th>
								<th className='px-4 py-3'>Options</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100'>
							{sortedPost.map(post => (
								<RowPostList key={post.id} post={post} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
