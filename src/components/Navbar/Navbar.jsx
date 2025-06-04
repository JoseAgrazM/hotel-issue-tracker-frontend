import { NavLink } from 'react-router-dom';
import { LogoutIconSVG } from '@/ui';
import {
	useAuthStore,
	useCompanyStore,
	usePostsStore,
	useUsersStore,
	useRoomStore,
} from '@/hooks';
import './Navbar.css';

export const Navbar = () => {
	const { startLogout, user, userLog } = useAuthStore();
	const { setActiveCompany } = useCompanyStore();
	const { startCleanStateUsers } = useUsersStore();
	const { startClearPost } = usePostsStore();
	const { startClearRooms } = useRoomStore();

	const roleCaptilized = ` ${userLog?.role
		?.charAt(0)
		?.toUpperCase()}${userLog?.role?.slice(1)?.toLowerCase()}`;

	const onSelectCompany = () => {
		setActiveCompany(null);
		startCleanStateUsers();
		startClearPost();
		startClearRooms();
		localStorage.removeItem('companyActiveId');
	};

	return (
		<nav className='nav_container'>
			<figure className='nav_logo'>
				<NavLink to='/'>
					<img
						className='logo_image_hotel'
						src='/assets/img/icons/hotel-svgrepo-com.svg'
						alt='logo'
					/>
				</NavLink>
			</figure>
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
			<span className='user_name'>
				{userLog.name || userLog.userName}
			</span>
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
			<button onClick={startLogout} className='logout_navbar'>
				<LogoutIconSVG size='40' color='red' />
				Logout
			</button>
		</nav>
	);
};
