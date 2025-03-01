import { Link } from 'react-router-dom';
import { useForm } from '../../../hooks';
import { LayoutAuth } from '../../Layouts';

const formForgotPassword = {
	forgotEmail: '',
};

export const ForgotPasswordPage = () => {
	const { forgotEmail, onInputChange } = useForm(formForgotPassword);
	return (
		<LayoutAuth title='Forgot Password'>
			<form className='form-container'>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						className='form-input'
						id='email'
						type='email'
						name='forgotEmail'
						value={forgotEmail}
						onChange={onInputChange}
						placeholder='example@google.es'
						required
					/>
				</div>
				<div className='form-group'>
					<input
						className='buttton-form-send'
						type='submit'
						value='Send'
					/>
				</div>
			</form>
			<div className='container-links-create'>
				<Link to='/auth/login' className='links-auth-pages'>
					Back
				</Link>
			</div>
		</LayoutAuth>
	);
};
