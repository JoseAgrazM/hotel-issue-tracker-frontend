import { useLocation } from 'react-router-dom';

export const LayoutAuth = ({ children, title }) => {
	const location = useLocation();
	const isLogin = location.pathname === '/auth/login';
	const animationDirection = isLogin
		? 'animate-fadeInLeft'
		: 'animate-fadeInRight';

	return (
		<div className='flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[calc(100vh-2rem)] p-4'>
			<div
				className={`
          hidden md:flex md:w-1/2 
          flex-col items-center justify-center 
          p-8 ${animationDirection}
        `}
			>
				<div className='flex flex-col items-center max-w-md'>
					<div className='bg-white p-6 rounded-full shadow-xl mb-8'>
						<img
							src='/assets/img/icons/hotel-svgrepo-com.svg'
							alt='Hotel Logo'
							className='w-24 h-24 text-blue-600'
						/>
					</div>

					<h1 className='text-6xl font-bold text-gray-800 text-center mb-4'>
						Hotel Issue Tracker
					</h1>

					<p className='text-2xl text-gray-600 text-center'>
						La solución perfecta para gestionar incidencias y
						mejorar la experiencia de tus huéspedes
					</p>
				</div>
			</div>

			<div
				className={`
          w-full md:w-1/2 
          flex flex-col items-center justify-center
          ${animationDirection}
        `}
			>
				<div className='w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden'>
					<div className='p-1 bg-gradient-to-r from-blue-500 to-indigo-600 '>
						<div className='bg-white p-8 rounded-t-xl '>
							<div className='md:hidden flex justify-center mb-6 '>
								<div className='bg-gray-100 p-4 rounded-full'>
									<img
										src='/assets/img/icons/hotel-svgrepo-com.svg'
										alt='Hotel Logo'
										className='w-16 h-16 text-blue-600'
									/>
								</div>
							</div>

							<h2 className='text-3xl font-bold text-center text-gray-800 mb-2'>
								{title}
							</h2>
							<div className='mt-8'>{children}</div>
						</div>
					</div>

					<div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 text-center'>
						<p>
							© {new Date().getFullYear()} Hotel Issue Tracker -
							Todos los derechos reservados
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
