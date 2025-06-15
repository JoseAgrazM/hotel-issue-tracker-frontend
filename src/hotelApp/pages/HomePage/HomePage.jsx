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
import { LogoutIconSVG } from '@/ui';

export const HomePage = () => {
	const { startLogout, userLog } = useAuthStore();

	const { rooms } = useRoomStore();
	const { isModalOpen, openModal, modalType } = useModalStore();
	const { posts, loading, error } = usePostsStore();
	const [reversePost, setReversePost] = useState([]);

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
			<LayoutPage title='Panel de Control'>
				<section className='mb-6 max-w-7xl mx-aut sm:px-5 lg:px-6'>
					<h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
						Bienvenido de nuevo,{' '}
						<span className='text-gradient bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent'>
							{userLog?.name}
						</span>
					</h2>
					<p
						fetchPriority='high'
						className='mt-2 text-base sm:text-lg text-gray-600 font-medium max-w-xl'
					>
						¿Qué te gustaría compartir hoy? <br /> Crea
						publicaciones o consulta el estado de las habitaciones
						al instante.
					</p>
				</section>

				{error && (
					<div className='max-w-3xl mx-auto mb-6 rounded-lg bg-red-100 border border-red-400 p-3 text-red-800 shadow animate-fadeIn'>
						Error al cargar publicaciones: {error}
					</div>
				)}

				<div className='flex justify-between sm:justify-start max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 mb-6 items-center gap-9'>
					<button
						onClick={() => openModal('create')}
						className='group relative inline-flex items-center justify-center px-2 py-1 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-300'
						aria-label='Crear nueva publicación'
					>
						<span className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-sky-600 opacity-40 blur-sm filter'></span>
						<span className='relative z-10 cursor-pointer'>
							Crear Nueva Publicación
						</span>
					</button>
					<button
						onClick={startLogout}
						className='cursor-pointer md:hidden flex items-center gap-3 border rounded-lg px-2 py-1 text-red-600 hover:text-red-700 text-base font-semibold transition'
					>
						<LogoutIconSVG size='40' color='red' />
						Cerrar sesión
					</button>
				</div>

				<div className='max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 flex flex-col lg:flex-row gap-8'>
					<div className='lg:w-1/3 bg-white rounded-xl shadow-md p-6 flex flex-col items-center h-full'>
						<div>
							<h3 className='text-xl font-semibold mb-4 text-gray-800'>
								Resumen Estado Habitaciones
							</h3>
						</div>
						<div className='flex justify-center items-center'>
							<RoomStatusChart
								total={totalRooms}
								occupied={occupiedRooms}
								available={availableRooms}
								blocked={blockedRooms}
							/>
						</div>
						<div className='mt-6 w-full'>
							<ul className='space-y-3'>
								<li className='flex items-center gap-4'>
									<span className='w-5 h-5 rounded-full bg-[#36A2EB] block'></span>
									<span>Disponible</span>
								</li>
								<li className='flex items-center gap-4'>
									<span className='w-5 h-5 rounded-full bg-[#FF6384] block'></span>
									<span>Ocupada</span>
								</li>
								<li className='flex items-center gap-4'>
									<span className='w-5 h-5 rounded-full bg-[#FFCE56] block'></span>
									<span>Bloqueada</span>
								</li>
							</ul>
						</div>
					</div>

					<div className='lg:w-2/3 bg-white rounded-xl shadow-md p-6 min-h-auto'>
						{isModalOpen && modalType === 'create' && (
							<ModalFormPost />
						)}

						{loading ? (
							<div className='flex justify-center items-center h-full py-10'>
								<div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 animate-spin'></div>
							</div>
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2'>
								{reversePost.length === 0 ? (
									<h3 className='text-center text-gray-600 text-lg font-light'>
										Aún no hay publicaciones. ¡Sé el primero
										en crear una!
									</h3>
								) : (
									reversePost
										.slice(0, 4)
										.map((post, index) => (
											<CardLastPost
												key={post.id}
												post={post}
												isLast={index === 0}
												className='hover:shadow-lg transition-shadow duration-300 rounded-lg'
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
