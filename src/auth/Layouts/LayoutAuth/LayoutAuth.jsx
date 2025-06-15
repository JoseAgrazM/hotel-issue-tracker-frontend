import { useLocation } from 'react-router-dom';

export const LayoutAuth = ({ children, title }) => {
	const location = useLocation();
	const isLogin = location.pathname === '/auth/login';
	const animationDirection = isLogin
		? 'animate-fadeInLeft'
		: 'animate-fadeInRight';

	return (
		<div className='flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[calc(100vh-2rem)] h-screen p-4'>
			<div
				className={`
          hidden md:flex md:w-1/2 
          flex-col items-center justify-center 
          p-6 ${animationDirection}
        `}
			>
				<div className='flex flex-col items-center max-w-md'>
					<div className='bg-white p-5 rounded-full shadow-xl mb-4'>
						<img
							src='/assets/img/icons/hotel-svgrepo-com.svg'
							alt='Hotel Logo'
							className='w-20 h-20 text-blue-600'
						/>
					</div>

					<h1 className='text-4xl font-bold text-gray-800 text-center mb-2'>
						Hotel Issue Tracker
					</h1>

					<p className='text-lg text-gray-600 text-center'>
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
					<div className='p-1 bg-gradient-to-r from-blue-500 to-indigo-600'>
						<div className='bg-white p-6 rounded-t-xl'>
							<div className='md:hidden flex justify-center mb-4'>
								<div className='bg-gray-100 p-3 rounded-full'>
									<img
										src='/assets/img/icons/hotel-svgrepo-com.svg'
										alt='Hotel Logo'
										className='w-14 h-14 text-blue-600'
									/>
								</div>
							</div>

							<h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>
								{title}
							</h2>

							<div className='mt-6'>{children}</div>
						</div>
					</div>

					<div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 text-center text-sm'>
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
