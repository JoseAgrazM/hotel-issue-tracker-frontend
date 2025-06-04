import { useEffect } from 'react';
import { Navbar, ListPosts, ModalEditPost, ModalFormPost } from '@/components';
import { useModalStore, usePostsStore } from '@/hooks';
import { LayoutPage } from '../../Layouts';
import './postPage.css';

export const PostPage = () => {
	const { isModalOpen, modalType, openModal } = useModalStore();
	const { startLoadPost, posts } = usePostsStore();

	useEffect(() => {
		startLoadPost();
	}, []);

	return (
		<>
			<Navbar />
			<LayoutPage title='Posts'>
				{isModalOpen && modalType === 'createPost' && <ModalFormPost />}
				{isModalOpen && modalType === 'editPost' && <ModalEditPost />}

				<div className='container_post_list'>
					<ListPosts posts={posts} openModal={openModal} />
				</div>
			</LayoutPage>
		</>
	);
};
