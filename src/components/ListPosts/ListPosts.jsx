import { useMemo, useState } from 'react';
import { RowPostList } from '../RowPostList/RowPostList';
import { CardPostMobile } from '../CardPostMobile/CardPostMobile';

export const ListPosts = ({ posts = [], openModal }) => {
	const [sortById, setSortById] = useState(false);
	const [filterTitle, setFilterTitle] = useState('');

	const reversedPosts = useMemo(() => [...posts].reverse(), [posts]);

	const filteredPosts = useMemo(() => {
		const searchTerm = filterTitle.trim().toLowerCase();
		if (!searchTerm) return reversedPosts;
		return reversedPosts.filter(post =>
			post.namePost.toLowerCase().includes(searchTerm)
		);
	}, [reversedPosts, filterTitle]);

	const sortedPosts = useMemo(() => {
		if (!sortById) return filteredPosts;
		return [...filteredPosts].sort((a, b) => a.id - b.id);
	}, [filteredPosts, sortById]);

	const toggleSortById = () => setSortById(prev => !prev);

	return (
		<div className='space-y-6 w-full'>
			<section className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
				<div className='flex flex-wrap gap-3'>
					<button
						onClick={() => openModal('createPost')}
						className='bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:shadow-lg transition'
					>
						Nuevo Post
					</button>

					<button
						onClick={toggleSortById}
						className='bg-white border border-gray-300 px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 transition'
					>
						{sortById ? 'Más antiguo' : 'Más reciente'}
					</button>
				</div>

				<div className='flex gap-2 mt-2 md:mt-0 w-full md:w-auto'>
					<input
						type='text'
						value={filterTitle}
						onChange={e => setFilterTitle(e.target.value)}
						placeholder='Buscar por título'
						className='flex-grow md:flex-grow-0 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
					/>
					<button
						onClick={() => setFilterTitle('')}
						disabled={!filterTitle}
						className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50'
					>
						Limpiar
					</button>
				</div>
			</section>

			{posts.length < 1 ? (
				<div className='text-center text-gray-500 text-base font-medium bg-gray-100 rounded-md p-4 shadow-sm'>
					Debes crear habitaciones antes para asignar un post.
				</div>
			) : (
				<>
					<div className='hidden md:block overflow-x-auto rounded-lg shadow bg-white'>
						<table className='min-w-[900px] w-full divide-y divide-gray-200 text-sm text-left'>
							<thead className='bg-gray-50 text-gray-700 uppercase font-semibold'>
								<tr>
									<th className='px-3 py-2'>Estado</th>
									<th className='px-3 py-2'>Creado</th>
									<th className='px-3 py-2'>Habitación</th>
									<th className='px-3 py-2'>Título</th>
									<th className='px-3 py-2'>Descripción</th>
									<th className='px-3 py-2'>Creado Por</th>
									<th className='px-3 py-2'>Resuelto</th>
									<th className='px-3 py-2'>
										Completado Por
									</th>
									<th className='px-3 py-2'>Opciones</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-100'>
								{sortedPosts.map(post => (
									<RowPostList
										key={post.id}
										post={post}
										openModal={openModal}
									/>
								))}
							</tbody>
						</table>
					</div>

					<CardPostMobile sortedPosts={sortedPosts} />
				</>
			)}
		</div>
	);
};
