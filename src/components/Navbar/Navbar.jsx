import { NavLink } from 'react-router-dom';
import {
	useAuthStore,
	useCompanyStore,
	usePostsStore,
	useUsersStore,
} from '@/hooks';
import { LogoutIconSVG } from '../../ui';
import './Navbar.css';
import { useRoomStore } from '../../hooks';

export const Navbar = () => {
	const { startLogout, user } = useAuthStore();
	const { setActiveCompany } = useCompanyStore();
	const { startCleanStateUsers } = useUsersStore();
	const { startClearPost } = usePostsStore();
	const { startClearRooms } = useRoomStore();

	const onSelectCompany = () => {
		setActiveCompany(null);
		startCleanStateUsers();
		startClearPost();
		startClearRooms();
		localStorage.removeItem('companyActiveId');
	};

	return (
		<nav className='nav_container'>
			<figure className='nav_logo'>LOGO</figure>
			<ul className='nav_links'>
				<NavLink
					className={({ isActive }) =>
						`nav_link ${isActive ? 'activeRoute' : ''}`
					}
					to='/'
				>
					HOME
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`nav_link ${isActive ? 'activeRoute' : ''}`
					}
					to='/post'
				>
					POST
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`nav_link ${isActive ? 'activeRoute' : ''}`
					}
					to='/rooms'
				>
					ROOMS
				</NavLink>
				{user.role === 'SUPERADMIN' && (
					<>
						<NavLink
							className={({ isActive }) =>
								`nav_link ${isActive ? 'activeRoute' : ''}`
							}
							to='/users'
						>
							USERS
						</NavLink>
					</>
				)}
				&nbsp;
				<NavLink
					className={({ isActive }) =>
						`nav_link ${isActive ? 'activeRoute' : ''}`
					}
					to='/profile'
				>
					PROFILE
				</NavLink>
			</ul>
			<span className='user-name'>{user.name || user.userName}</span>
			{user.role === 'SUPERADMIN' && (
				<NavLink to='/select-companies'>
					<button
						className='btn_nav_select_companies'
						onClick={onSelectCompany}
					>
						COMPANIES
					</button>
				</NavLink>
			)}
			<LogoutIconSVG onClick={startLogout} size='40' color='red' />
		</nav>
	);
};
