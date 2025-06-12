import Swal from 'sweetalert2';
import { LayoutModal } from '../../hotelApp/Layouts';
import { useModalStore, useCompanyStore, useForm } from '@/hooks';

export const ModalEditCompany = () => {
	const { startEditCompany, companyActive } = useCompanyStore();
	const { closeModal } = useModalStore();

	const {
		companyName,
		phoneCompany,
		addressCompany,
		city,
		country,
		onInputChange,
	} = useForm(companyActive);

	const onEditCompany = async event => {
		event.preventDefault();
		if (companyName.length < 4) {
			Swal.fire(
				'Error en registro',
				'El nombre debe tener al menos 4 caracteres',
				'error'
			);
			return;
		}
		if (phoneCompany.length < 9) {
			Swal.fire(
				'Error en registro',
				'El número de teléfono debe tener al menos 9 dígitos',
				'error'
			);
			return;
		}
		const resp = await startEditCompany({
			companyName,
			phoneCompany,
			addressCompany,
			city,
			country,
		});

		if (resp.ok) {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Empresa actualizada con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
			closeModal();
		}
	};

	return (
		<LayoutModal title='Editar Empresa'>
			<form onSubmit={onEditCompany} className='space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label
							htmlFor='companyName'
							className='block mb-2 font-semibold text-gray-700'
						>
							Nombre de la Empresa
						</label>
						<input
							id='companyName'
							name='companyName'
							value={companyName || ''}
							onChange={onInputChange}
							type='text'
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label
							htmlFor='phoneCompany'
							className='block mb-2 font-semibold text-gray-700'
						>
							Teléfono
						</label>
						<input
							id='phoneCompany'
							name='phoneCompany'
							value={phoneCompany || ''}
							onChange={onInputChange}
							type='text'
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div>
						<label
							htmlFor='addressCompany'
							className='block mb-2 font-semibold text-gray-700'
						>
							Dirección
						</label>
						<input
							id='addressCompany'
							name='addressCompany'
							value={addressCompany || ''}
							onChange={onInputChange}
							type='text'
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label
							htmlFor='city'
							className='block mb-2 font-semibold text-gray-700'
						>
							Ciudad
						</label>
						<input
							id='city'
							name='city'
							value={city || ''}
							onChange={onInputChange}
							type='text'
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label
							htmlFor='country'
							className='block mb-2 font-semibold text-gray-700'
						>
							País
						</label>
						<input
							id='country'
							name='country'
							value={country || ''}
							onChange={onInputChange}
							type='text'
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
				</div>

				<div>
					<button
						type='submit'
						className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition'
					>
						Guardar Cambios
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
