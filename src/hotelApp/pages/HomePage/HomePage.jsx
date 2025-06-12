import { CardLastPost, ModalFormPost, RoomStatusChart } from '@/components';
import {
	useModalStore,
	usePostsStore,
	useAuthStore,
	useRoomStore,
} from '@/hooks';
import { LayoutPage } from '../../Layouts';
import { useEffect, useState } from 'react';
import { Navbar } from '../../../components/Navbar/Navbar';

export const HomePage = () => {
	const { userLog } = useAuthStore();
	const { rooms } = useRoomStore();
	const { isModalOpen, openModal, modalType } = useModalStore();
	const { posts, loading, error } = usePostsStore();
	const [reversePost, setReversePost] = useState([]);

	// Estadísticas de habitaciones
	const totalRooms = rooms?.length ?? 0;
	const availableRooms =
		rooms?.filter(r => r.roomState === 'AVAILABLE').length ?? 0;
	const occupiedRooms =
		rooms?.filter(r => r.roomState === 'OCCUPIED').length ?? 0;
	const blockedRooms =
		rooms?.filter(r => r.roomState === 'BLOCKED').length ?? 0;

	useEffect(() => {
		setReversePost([...posts].reverse());
	}, [posts]);

	return (
		<>
			<Navbar />
			<LayoutPage title='Dashboard'>
				<section className='mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight'>
						Welcome back,{' '}
						<span className='text-gradient bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent'>
							{userLog?.name}
						</span>
					</h2>
					<p className='mt-3 text-lg sm:text-xl text-gray-600 font-medium max-w-xl'>
						What would you like to share today? <br /> Create posts
						or check room statuses instantly.
					</p>
				</section>

				{/* Error */}
				{error && (
					<div className='max-w-3xl mx-auto mb-8 rounded-lg bg-red-100 border border-red-400 p-4 text-red-800 shadow-lg animate-fadeIn'>
						Error loading posts: {error}
					</div>
				)}

				{/* Botón crear post */}
				<div className='flex justify-center sm:justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10'>
					<button
						onClick={() => openModal('create')}
						className='group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300'
						aria-label='Create new post'
					>
						<span className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-600 opacity-50 blur-md filter'></span>
						<span className='relative z-10 cursor-pointer'>Create New Post</span>
					</button>
				</div>

				{/* Contenido principal */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12'>
					{/* Gráfico estado habitaciones */}
					<div className='lg:w-1/3 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center'>
						<h3 className='text-2xl font-semibold mb-6 text-gray-800'>
							Room Status Overview
						</h3>
						<RoomStatusChart
							total={totalRooms}
							occupied={occupiedRooms}
							available={availableRooms}
							blocked={blockedRooms}
						/>
					</div>

					{/* Posts y modal */}
					<div className='lg:w-2/3 bg-white rounded-2xl shadow-xl p-8 min-h-[480px]'>
						{isModalOpen && modalType === 'create' && (
							<ModalFormPost />
						)}

						{loading ? (
							<div className='flex justify-center items-center h-full'>
								<div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-20 w-20 animate-spin'></div>
							</div>
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
								{reversePost.length === 0 ? (
									<h3 className='text-center text-gray-400 text-xl font-light'>
										No posts available yet. Be the first to
										create one!
									</h3>
								) : (
									reversePost
										.slice(0, 4)
										.map((post, index) => (
											<CardLastPost
												key={post.id}
												post={post}
												isLast={index === 0}
												className='hover:shadow-2xl transition-shadow duration-300'
											/>
										))
								)}
							</div>
						)}
					</div>
				</div>
			</LayoutPage>
		</>
	);
};
