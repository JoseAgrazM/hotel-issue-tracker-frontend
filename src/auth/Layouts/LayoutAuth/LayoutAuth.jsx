import { useLocation } from 'react-router-dom';
import './layoutAuth.css';
export const LayoutAuth = ({ children, title }) => {
	const location = useLocation();

	const isLogin = location.pathname === '/auth/login';

	return (
		<div className='layout-auth-container'>
			<div
				className={`content-box-auth ${
					isLogin
						? 'animate__animated animate__fadeInLeft'
						: 'animate__animated animate__fadeInRight'
				}`}
			>
				<h1>{title}</h1>
				<div className='content-children'>{children}</div>
			</div>
		</div>
	);
};
