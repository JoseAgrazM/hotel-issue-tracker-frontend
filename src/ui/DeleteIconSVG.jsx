export const DeleteIconSVG = ({
	onClick,
	color = 'currentColor',
	size = 24,
}) => {
	return (
		<svg
			className='button_edit_user'
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none' // Puedes cambiar a `fill={color}` si quieres relleno
			stroke={color} // Usa la prop `color` para el stroke
			strokeWidth='2' // Cambiado a camelCase
			strokeLinecap='round' // Cambiado a camelCase
			strokeLinejoin='round' // Cambiado a camelCase
			onClick={onClick}
			style={{ cursor: 'pointer' }}
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M4 7l16 0' />
			<path d='M10 11l0 6' />
			<path d='M14 11l0 6' />
			<path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
			<path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
		</svg>
	);
};
