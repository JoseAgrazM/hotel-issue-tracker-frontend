import { Link } from 'react-router-dom';
import { LayoutAuth } from '@/auth/Layouts/LayoutAuth/LayoutAuth';
import './registerUserPage.css';

export const RegisterUserPage = () => {
	return (
		<LayoutAuth
			title='Register User'
			className='animate__animated animate__fadeInLeft'
		>
			<form className='form-user-container' action=''>
				<div className='container-section-form'>
					<section className='section-register-form'>
						<div className='form-user-group'>
							<label>Name</label>
							<input
								className='form-input'
								type='text'
								required
							/>
						</div>
						<div className='form-user-group'>
							<label>Surname</label>
							<input
								className='form-input'
								type='text'
								required
							/>
						</div>
						<div className='form-user-group'>
							<label>Phone</label>
							<input
								className='form-input'
								type='text'
								required
							/>
						</div>
					</section>
					<section className='section-register-form'>
						<div className='form-user-group'>
							<label>Email</label>
							<input
								className='form-input'
								type='email'
								required
							/>
						</div>

						<div className='form-user-group'>
							<label>Password</label>
							<input
								className='form-input'
								type='password'
								required
							/>
						</div>
						<div className='form-user-group'>
							<label>Repeat password</label>
							<input
								className='form-input'
								type='password'
								required
							/>
						</div>
					</section>
				</div>
				<div className='form-user-group'>
					<input
						className='buttton-form-user-send'
						type='submit'
						value='Send'
					/>
				</div>
			</form>
			<div className='container-links-create'>
				<Link to='/auth/login' className='links-auth-pages'>
					Sign In
				</Link>
				<Link to='/auth/register-admin' className='links-auth-pages'>
					Create admin account
				</Link>
			</div>
		</LayoutAuth>
	);
};
