import {
	CardLastPost,
	ModalFormPost,
	Navbar,
	RoomStatusChart,
} from '@/components';
import {
	useModalStore,
	usePostsStore,
	useAuthStore,
	useRoomStore,
} from '@/hooks';
import { LayoutPage } from '../../Layouts';
import { useEffect, useState } from 'react';
import './homePage.css';

export const HomePage = () => {
	const { user } = useAuthStore();
	const { rooms } = useRoomStore();
	const { isModalOpen, openModal, modalType } = useModalStore();
	const { posts, loading, error } = usePostsStore();
	const [reversePost, setReversePost] = useState([]);

	const totalRooms = rooms?.length || 0;
	const availableRooms =
		rooms.filter(room => room?.roomState === 'AVAILABLE').length || 0;
	const occupiedRooms =
		rooms.filter(room => room?.roomState === 'OCCUPIED').length || 0;
	const blockedRooms =
		rooms.filter(room => room?.roomState === 'BLOCKED').length || 0;

	useEffect(() => {
		setReversePost([...posts].reverse());
	}, [posts]);

	return (
		<>
			<Navbar />
			<LayoutPage>
				<div className='header-container'>
					<div className='welcome-container'>
						<h2 className='welcome-message'>
							Welcome back,{' '}
							<span className='welcome_user_name'>
								{user.name}
							</span>
						</h2>
						<p className='welcome-subtext'>
							What would you like to share today?
						</p>
					</div>
				</div>

				{error && (
					<div className='error-message'>
						Error loading posts: {error}
					</div>
				)}

				<button
					onClick={() => openModal('create')}
					className='new-post-button'
				>
					Create New Post
				</button>
				<div className='content'>
					<RoomStatusChart
						total={totalRooms}
						occupied={occupiedRooms}
						available={availableRooms}
						blocked={blockedRooms}
					/>
					{isModalOpen && modalType === 'create' && <ModalFormPost />}
					{loading ? (
						<div className='loading-spinner'></div>
					) : (
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
					)}
				</div>
			</LayoutPage>
		</>
	);
};
