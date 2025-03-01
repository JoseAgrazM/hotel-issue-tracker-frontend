export const LogoutIconSVG = ({ onClick, color = 'red', size = 24 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke={color}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='icon icon-tablet icons-tablet-outline icon-tablet-logout-2 btn_logout'
			onClick={onClick}
			style={{ cursor: 'pointer' }}
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2' />
			<path d='M15 12h-12' />
			<path d='M6 15l-3 -3 3 -3' />
		</svg>
	);
};
