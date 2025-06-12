import { useEffect } from 'react';
import { Navbar, ListPosts, ModalEditPost, ModalFormPost } from '@/components';
import { useModalStore, usePostsStore } from '@/hooks';
import { LayoutPage } from '../../Layouts';

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

				<section className='px-4 sm:px-8 py-6 w-full'>
					<header className='mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
						<h2 className='text-2xl font-bold text-gray-800'>
							Listado de Posts
						</h2>
					</header>

					<ListPosts posts={posts} openModal={openModal} />
				</section>

				<button
					onClick={() => openModal('createPost')}
					className='cursor-pointer fixed bottom-20 right-4 z-40 p-4 shadow-lg bg-blue-600 size-14 text-white rounded-full  hover:bg-blue-700 transition md:hidden'
					aria-label='Crear nuevo post'
				>
					+
				</button>
			</LayoutPage>
		</>
	);
};
