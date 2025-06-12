export const NotUsers = () => {
	return (
		<div className='flex flex-col items-center justify-center py-12 px-4 text-center gap-4'>
			<h2 className='text-3xl font-bold text-gray-700 mb-4'>
				No hay usuarios registrados
			</h2>
			<img
				src='/assets/img/undraw_void_wez2.svg'
				alt='Imagen de un hombre solo mirando a la nada'
				className='max-w-sm w-full'
			/>
			<p className='text-gray-600 mt-4 text-xl'>
				Agrega nuevos usuarios para comenzar a gestionar tu empresa.
			</p>
		</div>
	);
};
