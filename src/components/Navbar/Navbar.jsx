import { NavLink } from 'react-router-dom';
import {
	Home,
	FileText,
	Bed,
	Users,
	User,
	Building2,
	LogOut,
} from 'lucide-react';
import {
	useAuthStore,
	useCompanyStore,
	usePostsStore,
	useUsersStore,
	useRoomStore,
} from '@/hooks';
import { NavItem, NavItemMobile } from '../../NavItem/NavItem.jsx/NavItem';
import { LogoutIconSVG } from '@/ui';

export const Navbar = () => {
	const { startLogout, user, userLog } = useAuthStore();
	const { setActiveCompany } = useCompanyStore();
	const { startCleanStateUsers } = useUsersStore();
	const { startClearPost } = usePostsStore();
	const { startClearRooms } = useRoomStore();

	const roleCapitalized = userLog?.role
		? userLog.role.charAt(0).toUpperCase() +
		  userLog.role.slice(1).toLowerCase()
		: '';

	const onSelectCompany = () => {
		setActiveCompany(null);
		startCleanStateUsers();
		startClearPost();
		startClearRooms();
		localStorage.removeItem('companyActiveId');
	};

	return (
		<>
			<aside className='hidden md:flex h-screen w-64 bg-white border-r shadow-sm flex-col justify-between fixed left-0 top-0 z-50 text-lg'>
				<div>
					<div className='flex items-center justify-center py-6 border-b'>
						<NavLink to='/'>
							<img
								src='/assets/img/icons/hotel-svgrepo-com.svg'
								alt='Hotel Logo'
								className='h-28' // un poco más grande que antes (antes 10)
							/>
						</NavLink>
					</div>

					<nav className='mt-6 px-6 space-y-5'>
						{' '}
						{/* padding horizontal y espacio entre items aumentados */}
						<NavItem
							to='/'
							label='Home'
							icon={Home}
							iconClass='w-10 h-10'
						/>
						<NavItem
							to='/post'
							label='Posts'
							icon={FileText}
							iconClass='w-10 h-10'
						/>
						<NavItem
							to='/rooms'
							label='Rooms'
							icon={Bed}
							iconClass='w-10 h-10'
						/>
						{user.role === 'SUPERADMIN' && (
							<NavItem
								to='/users'
								label='Users'
								icon={Users}
								iconClass='w-10 h-10'
							/>
						)}
						<NavItem
							to='/profile'
							label='Profile'
							icon={User}
							iconClass='w-10 h-10'
						/>
						{user.role === 'SUPERADMIN' && (
							<NavItem
								to='/select-company'
								label='Companies'
								icon={Building2}
								iconClass='w-10 h-10'
								onClick={onSelectCompany}
							/>
						)}
					</nav>
				</div>

				<div className='px-8 py-8 border-t text-xl'>
					<div className='text-gray-700 mb-4'>
						<span className='block font-bold text-2xl'>
							{userLog?.name || userLog?.userName}
						</span>
						<span className='text-lg'>{roleCapitalized}</span>
					</div>
					<button
						onClick={startLogout}
						className=' cursor-pointer flex items-center gap-4 text-red-600 hover:text-red-700 text-xl font-bold transition'
					>
						<LogoutIconSVG size='30' color='red' />
						Logout
					</button>
				</div>
			</aside>

			<nav className='fixed md:hidden bottom-0 w-full bg-transparent backdrop-blur-2xl border-t flex justify-around py-2 z-50 rounded-t-3xl '>
				<NavItemMobile to='/' label='Home' icon={Home} />
				<NavItemMobile to='/post' label='Posts' icon={FileText} />
				<NavItemMobile to='/rooms' label='Rooms' icon={Bed} />
				<NavItemMobile to='/users' label='Users' icon={Users} />
				<NavItemMobile to='/profile' label='Profile' icon={User} />
				<NavItemMobile
					to='/select-company'
					label='Companies'
					icon={Building2}
					onClick={onSelectCompany}
				/>
			</nav>
		</>
	);
};
