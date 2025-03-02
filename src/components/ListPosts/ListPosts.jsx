import { useMemo, useState } from 'react';
import { RowPostList } from '../RowPostList/RowPostList';
import './ListPosts.css';

export const ListPosts = ({ posts = [], openModal }) => {
	const [sortById, setSortById] = useState(false);
	const reversePost = [...posts].reverse();
	const [filterTitle, setFilterTitle] = useState(null);

	const toggleSortById = () => {
		setSortById(prevState => !prevState);
	};

	const filteredPost = useMemo(() => {
		const searchTerm = filterTitle?.trim().toLowerCase();
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
		<>
			<section className='container_options_filter_list'>
				<button
					onClick={() => openModal('createPost')}
					className='button_new_post'
				>
					New Post
				</button>

				<button onClick={toggleSortById} className='button_sort_post'>
					{sortById ? 'Mas antiguo' : 'Mas reciente'}
				</button>
				<div className='container_input_button'>
					<input
						type='text'
						value={filterTitle || ''}
						onChange={e => {
							setFilterTitle(e.target.value);
						}}
						placeholder='Busca por titulo'
						className='input_search_post'
					/>
					<button
						className='button_clear_filter'
						onClick={() => setFilterTitle('')}
						disabled={!filterTitle}
					>
						Clear filter
					</button>
				</div>
			</section>

			{posts.length < 1 ? (
				<h3>
					Debes crear habitaciones antes, para porder asignarle el
					post a una de las habitaciones
				</h3>
			) : (
				<div className='table_container'>
					<table className='styled_table'>
						<thead>
							<tr>
								<th>Status</th>
								<th>Created</th>
								<th>Room</th>
								<th>Title</th>
								<th>Description</th>
								<th>Created By</th>
								<th>Resolved</th>
								<th>Completed By</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody className='container_tbody'>
							{sortedPost?.map(post => (
								<RowPostList key={post.id} post={post} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};
