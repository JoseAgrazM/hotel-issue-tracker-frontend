import { LayoutModal } from '@/hotelApp/Layouts/LayoutModal/LayoutModal';
import { useCompanyStore, useForm, useModalStore } from '../../hooks';
import Swal from 'sweetalert2';

const initialForm = {
	companyName: '',
	phoneCompany: '',
	addressCompany: '',
	city: '',
	country: '',
};

export const ModalFormCompany = () => {
	const { startCreateCompany } = useCompanyStore();
	const { closeModal } = useModalStore();

	const {
		companyName,
		phoneCompany,
		addressCompany,
		city,
		country,
		onInputChange,
	} = useForm(initialForm);

	const validateForm = () => {
		if (companyName.trim().length < 4) {
			Swal.fire(
				'Error en registro',
				'El nombre debe tener mínimo 4 caracteres',
				'error'
			);
			return false;
		}
		if (phoneCompany.trim().length < 9) {
			Swal.fire(
				'Error en registro',
				'El número de teléfono debe tener al menos 9 dígitos',
				'error'
			);
			return false;
		}
		if (!addressCompany.trim() || !city.trim() || !country.trim()) {
			Swal.fire(
				'Error en registro',
				'Todos los campos son obligatorios',
				'error'
			);
			return false;
		}
		return true;
	};

	const onCreateCompany = async event => {
		event.preventDefault();

		if (!validateForm()) return;

		const resp = await startCreateCompany({
			companyName: companyName.trim(),
			phoneCompany: phoneCompany.trim(),
			addressCompany: addressCompany.trim(),
			city: city.trim(),
			country: country.trim(),
		});

		if (resp.ok) {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '¡Empresa creada con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
			closeModal();
		}
	};

	return (
		<LayoutModal title='Nueva Empresa' onClose={closeModal}>
			<form onSubmit={onCreateCompany} className='space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<label
							htmlFor='companyName'
							className='block text-sm font-medium text-gray-700'
						>
							Nombre de la empresa{' '}
							<span className='text-red-500'>*</span>
						</label>
						<input
							id='companyName'
							name='companyName'
							type='text'
							placeholder='Ingrese nombre de la empresa'
							value={companyName}
							onChange={onInputChange}
							required
							minLength={4}
							className={`w-full px-4 py-2 border rounded-lg transition
								${
									companyName.length > 0 &&
									companyName.length < 4
										? 'border-red-500 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
								}`}
						/>
						{companyName.length > 0 && companyName.length < 4 && (
							<p className='text-xs text-red-600'>
								Mínimo 4 caracteres
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<label
							htmlFor='phoneCompany'
							className='block text-sm font-medium text-gray-700'
						>
							Teléfono <span className='text-red-500'>*</span>
						</label>
						<input
							id='phoneCompany'
							name='phoneCompany'
							type='tel'
							placeholder='Ingrese número de teléfono'
							value={phoneCompany}
							onChange={onInputChange}
							required
							minLength={9}
							className={`w-full px-4 py-2 border rounded-lg transition
								${
									phoneCompany.length > 0 &&
									phoneCompany.length < 9
										? 'border-red-500 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
								}`}
						/>
						{phoneCompany.length > 0 && phoneCompany.length < 9 && (
							<p className='text-xs text-red-600'>
								Mínimo 9 dígitos
							</p>
						)}
					</div>
				</div>

				<div className='space-y-2'>
					<label
						htmlFor='addressCompany'
						className='block text-sm font-medium text-gray-700'
					>
						Dirección <span className='text-red-500'>*</span>
					</label>
					<input
						id='addressCompany'
						name='addressCompany'
						type='text'
						placeholder='Ingrese dirección de la empresa'
						value={addressCompany}
						onChange={onInputChange}
						required
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<label
							htmlFor='city'
							className='block text-sm font-medium text-gray-700'
						>
							Ciudad <span className='text-red-500'>*</span>
						</label>
						<input
							id='city'
							name='city'
							type='text'
							placeholder='Ingrese ciudad'
							value={city}
							onChange={onInputChange}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
						/>
					</div>

					<div className='space-y-2'>
						<label
							htmlFor='country'
							className='block text-sm font-medium text-gray-700'
						>
							País <span className='text-red-500'>*</span>
						</label>
						<input
							id='country'
							name='country'
							type='text'
							placeholder='Ingrese país'
							value={country}
							onChange={onInputChange}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
						/>
					</div>
				</div>

				<div className='flex justify-center pt-4 mt-6'>
					<button
						type='submit'
						className='cursor-pointer px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
					>
						Crear Empresa
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
