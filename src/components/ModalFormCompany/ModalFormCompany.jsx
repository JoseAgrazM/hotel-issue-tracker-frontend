import { LayoutModal } from '@/hotelApp/Layouts/LayoutModal/LayoutModal';
import { useCompanyStore, useForm, useModalStore } from '../../hooks';
import Swal from 'sweetalert2';

const newCompanyForm = {
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
	} = useForm(newCompanyForm);

	const onCreateCompany = async event => {
		event.preventDefault();

		if (companyName.length < 4) {
			Swal.fire(
				'Error en registro',
				'El nombre debe de tener mínimo 4 caracteres',
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

		const resp = await startCreateCompany({
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
				title: '¡Empresa creada con éxito!',
				showConfirmButton: false,
				timer: 1500,
			});
			closeModal();
		}
	};

	return (
		<LayoutModal title='New Company' onClose={closeModal}>
			<form onSubmit={onCreateCompany} className='space-y-6'>
				{/* Primera fila de inputs */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							Company Name *
						</label>
						<input
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
							name='companyName'
							value={companyName || ''}
							onChange={onInputChange}
							type='text'
							placeholder='Enter company name'
							required
							minLength={4}
						/>
						{companyName.length > 0 && companyName.length < 4 && (
							<p className='text-xs text-red-500'>
								Minimum 4 characters required
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							Phone Number *
						</label>
						<input
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
							name='phoneCompany'
							value={phoneCompany || ''}
							onChange={onInputChange}
							type='tel'
							placeholder='Enter phone number'
							required
							minLength={9}
						/>
						{phoneCompany.length > 0 && phoneCompany.length < 9 && (
							<p className='text-xs text-red-500'>
								Minimum 9 digits required
							</p>
						)}
					</div>
				</div>

				{/* Segunda fila de inputs */}
				<div className='space-y-6'>
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							Address *
						</label>
						<input
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
							name='addressCompany'
							value={addressCompany || ''}
							onChange={onInputChange}
							type='text'
							placeholder='Enter company address'
							required
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-2'>
							<label className='block text-sm font-medium text-gray-700'>
								City *
							</label>
							<input
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
								name='city'
								value={city || ''}
								onChange={onInputChange}
								type='text'
								placeholder='Enter city'
								required
							/>
						</div>

						<div className='space-y-2'>
							<label className='block text-sm font-medium text-gray-700'>
								Country *
							</label>
							<input
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
								name='country'
								value={country || ''}
								onChange={onInputChange}
								type='text'
								placeholder='Enter country'
								required
							/>
						</div>
					</div>
				</div>

				{/* Botón de submit */}
				<div className='flex justify-end pt-4 mt-6'>
					<button
						type='submit'
						className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
					>
						Create Company
					</button>
				</div>
			</form>
		</LayoutModal>
	);
};
