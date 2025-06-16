import { NavLink } from 'react-router-dom';
import { Home, FileText, Bed, Users, User, Building2 } from 'lucide-react';
import {
	useAuthStore,
	useCompanyStore,
	usePostsStore,
	useUsersStore,
	useRoomStore,
} from '@/hooks';
import { LogoutIconSVG } from '@/ui';
import { NavItem, NavItemMobile } from '../../NavItem/NavItem';

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
			<aside className='hidden md:flex h-screen w-52 bg-white border-r shadow-sm flex-col justify-between fixed left-0 top-0 z-50 text-base'>
				<div>
					<div className='flex items-center justify-center py-4 border-b'>
						<NavLink to='/'>
							<img
								src='/assets/img/LogoHotel.png'
								alt='Hotel Logo'
								className='h-30 drop-shadow-lg'
							/>
						</NavLink>
					</div>

					<nav className='mt-4 px-4 space-y-3'>
						<NavItem
							to='/'
							label='Inicio'
							icon={Home}
							iconClass='w-7 h-7'
						/>
						<NavItem
							to='/post'
							label='Posts'
							icon={FileText}
							iconClass='w-7 h-7'
						/>
						<NavItem
							to='/rooms'
							label='Habitaciones'
							icon={Bed}
							iconClass='w-7 h-7'
						/>
						{user.role === 'SUPERADMIN' && (
							<NavItem
								to='/users'
								label='Usuarios'
								icon={Users}
								iconClass='w-7 h-7'
							/>
						)}
						<NavItem
							to='/profile'
							label='Perfil'
							icon={User}
							iconClass='w-7 h-7'
						/>
						{user.role === 'SUPERADMIN' && (
							<NavItem
								to='/select-company'
								label='Empresas'
								icon={Building2}
								iconClass='w-7 h-7'
								onClick={onSelectCompany}
							/>
						)}
					</nav>
				</div>

				<div className='px-6 py-6 border-t text-base'>
					<div className='text-gray-700 mb-3'>
						<span className='block font-semibold text-xl'>
							{userLog?.name || userLog?.userName}
						</span>
						<span className='text-sm'>{roleCapitalized}</span>
					</div>
					<button
						onClick={startLogout}
						className='cursor-pointer flex items-center gap-3 text-red-600 hover:text-red-700 text-base font-semibold transition'
					>
						<LogoutIconSVG size='24' color='red' />
						Cerrar sesión
					</button>
				</div>
			</aside>

			<nav className='fixed md:hidden bottom-0 w-full bg-transparent backdrop-blur-2xl border-t flex justify-around py-1.5 z-50 rounded-t-3xl'>
				<NavItemMobile to='/' label='Inicio' icon={Home} />
				<NavItemMobile to='/post' label='Posts' icon={FileText} />
				<NavItemMobile to='/rooms' label='Habitaciones' icon={Bed} />
				<NavItemMobile to='/profile' label='Perfil' icon={User} />

				{user.role === 'SUPERADMIN' && (
					<NavItemMobile to='/users' label='Usuarios' icon={Users} />
				)}
				{user.role === 'SUPERADMIN' && (
					<NavItemMobile
						to='/select-company'
						label='Empresas'
						icon={Building2}
						onClick={onSelectCompany}
					/>
				)}
			</nav>
		</>
	);
};
