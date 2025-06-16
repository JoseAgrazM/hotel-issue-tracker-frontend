import { NavLink } from 'react-router-dom';

export const NavItem = ({ to, label, icon: Icon, onClick }) => (
	<NavLink
		to={to}
		onClick={onClick}
		className={({ isActive }) =>
			`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
				isActive
					? 'bg-sky-100 text-sky-700'
					: 'text-gray-700 hover:bg-gray-100'
			}`
		}
	>
		{Icon && <Icon size={32} />}
		{label}
	</NavLink>
);

export const NavItemMobile = ({ to, label, icon: Icon, onClick }) => (
	<NavLink
		to={to}
		onClick={onClick}
		className={({ isActive }) =>
			`flex flex-col items-center justify-center text-xs font-medium ${
				isActive ? 'text-sky-600' : 'text-gray-500'
			}`
		}
	>
		{Icon && <Icon size={20} />}
		<span>{label}</span>
	</NavLink>
);
