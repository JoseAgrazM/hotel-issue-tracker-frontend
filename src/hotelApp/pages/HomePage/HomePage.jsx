import { CardLastPost, ModalFormPost, Navbar } from '@/components';
import { useModalStore, usePostsStore } from '@/hooks';
import { LayoutPage } from '../../Layouts';
import './homePage.css';
import { useEffect } from 'react';

export const HomePage = () => {
	const { isModalOpen, openModal, modalType } = useModalStore();
	const { startLoadPost } = usePostsStore();
	const { posts } = usePostsStore();
	const reversePost = [...posts].reverse();

	// useEffect(() => {
	// 	startLoadPost();
	// 	startLoadRooms();
	// 	startLoadUsers();
	// }, []);

	return (
		<>
			<Navbar />
			<LayoutPage title='Home'>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
					sequi odio veniam, quasi veritatis quisquam praesentium
					beatae incidunt fugiat debitis ipsum ipsa, suscipit
					inventore dolorem! Quo expedita repudiandae dolorum vitae.
				</p>
				<div className='content'>
					<button
						onClick={() => openModal('create')}
						className='button-new-post'
					>
						Add new post
					</button>
					{isModalOpen && modalType === 'create' && <ModalFormPost />}
					<div className='last_post_container'>
						{reversePost.length < 1 ? (
							<h3>No hay post</h3>
						) : (
							reversePost.map(
								(post, index) =>
									index < 5 && (
										<CardLastPost
											key={post.id}
											post={post}
											isLast={index === 0}
										/>
									)
							)
						)}
					</div>
				</div>
			</LayoutPage>
		</>
	);
};
