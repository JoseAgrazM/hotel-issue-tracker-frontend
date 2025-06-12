import { Sparkles } from 'lucide-react';

export const ZeroCompanies = () => {
	return (
		<div className='flex flex-col items-center justify-center text-center py-16 px-4'>
			<div className='mb-4'>
				<Sparkles className='w-12 h-12 text-blue-500 animate-pulse' />
			</div>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-700 mb-2'>
				Aún no tienes compañías registradas
			</h2>
			<p className='text-gray-500 text-lg'>
				Empieza ahora creando tu primera compañía. ¡Es fácil y rápido!
			</p>
		</div>
	);
};
