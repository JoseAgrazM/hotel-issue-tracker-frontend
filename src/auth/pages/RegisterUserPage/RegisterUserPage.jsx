import { Link } from 'react-router-dom';
import { LayoutAuth } from '@/auth/Layouts/LayoutAuth/LayoutAuth';

export const RegisterUserPage = () => {
	return (
		<LayoutAuth
			title='Register User'
			className='animate__animated animate__fadeInLeft'
		>
			<form className='w-full max-w-2xl mx-auto space-y-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<section className='space-y-6'>
						<div>
							<label className='block text-base font-medium text-gray-700'>
								Name
							</label>
							<input
								type='text'
								required
								className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700'>
								Surname
							</label>
							<input
								type='text'
								required
								className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700'>
								Phone
							</label>
							<input
								type='text'
								required
								className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
							/>
						</div>
					</section>

					<section className='space-y-6'>
						<div>
							<label className='block text-base font-medium text-gray-700'>
								Email
							</label>
							<input
								type='email'
								required
								className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700'>
								Password
							</label>
							<input
								type='password'
								required
								className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
							/>
						</div>
						<div>
							<label className='block text-base font-medium text-gray-700'>
								Repeat password
							</label>
							<input
								type='password'
								required
								className='mt-2 w-full px-5 py-3 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400'
							/>
						</div>
					</section>
				</div>

				<div>
					<button
						type='submit'
						className='w-full bg-sky-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-sky-700 transition'
					>
						Send
					</button>
				</div>
			</form>

			<div className='mt-8 text-center text-base text-gray-600'>
				<Link to='/auth/login' className='block hover:underline'>
					Sign In
				</Link>
				<Link
					to='/auth/register-admin'
					className='block hover:underline'
				>
					Create admin account
				</Link>
			</div>
		</LayoutAuth>
	);
};
