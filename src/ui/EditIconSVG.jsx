import React from 'react';

export const EditIconSVG = ({ onClick, color = 'green', size = 24 }) => {
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
			<path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
			<path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
			<path d='M16 5l3 3' />
		</svg>
	);
};
