import { useLocation } from 'react-router-dom';
import './layoutAuth.css';
export const LayoutAuth = ({ children, title }) => {
	const location = useLocation();

	const isLogin = location.pathname === '/auth/login';

	return (
		<div className='layout-auth-container'>
			<div
				className={`logo_login ${
					isLogin
						? 'animate__animated animate__fadeInLeft'
						: 'animate__animated animate__fadeInRight'
				}`}
			>
				<img
					src='/assets/img/icons/hotel-svgrepo-com.svg'
					alt=''
					className='logo_image_hotel_login'
				/>
				<h1>Hotel Issue Tracker</h1>
			</div>
			<div
				className={`content-box-auth ${
					isLogin
						? 'animate__animated animate__fadeInLeft'
						: 'animate__animated animate__fadeInRight'
				}`}
			>
				<h2>{title}</h2>
				<div className='content-children'>{children}</div>
			</div>
		</div>
	);
};
