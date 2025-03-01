import Swal from 'sweetalert2';
import { LayoutModal } from '../../hotelApp/Layouts';
import { useModalStore, useCompanyStore } from '@/hooks';
import { useForm } from '../../hooks';

export const ModalEditCompany = () => {
	const { startCreateCompany, companyActive } = useCompanyStore();
	const { closeModal } = useModalStore();

	const {
		companyName,
		phoneCompany,
		addressCompany,
		city,
		country,
		onInputChange,
	} = useForm(companyActive);

	const onEditCompany = event => {
		console.log(companyActive);

		event.preventDefault();
		if (companyName.length < 4) {
			Swal.fire(
				'Error en registro',
				'El nombre debe de tener minimo 4 caracteres',
				'error'
			);
			return;
		}
		if (phoneCompany.length < 9) {
			Swal.fire(
				'Error en registro',
				'El numero de telefono tiene que tener mas de 9 digitos',
				'error'
			);
			return;
		}
		startCreateCompany({
			companyName,
			phoneCompany,
			addressCompany,
			city,
			country,
		});
		closeModal();
	};
	return (
		<LayoutModal title='New Company'>
			<form
				onSubmit={onEditCompany}
				className='form-user-container'
				action=''
			>
				<div className='container-section-form'>
					<div className='form-user-group'>
						<label>Name Company</label>
						<input
							className='form-input'
							name='companyName'
							value={companyName || ''}
							onChange={onInputChange}
							type='text'
							required
						/>
					</div>
					<div className='form-user-group'>
						<label>Phone Company</label>
						<input
							className='form-input'
							name='phoneCompany'
							value={phoneCompany || ''}
							onChange={onInputChange}
							type='text'
							required
						/>
					</div>
				</div>
				<div className='container-section-form'>
					<div className='form-user-group'>
						<label>Address</label>
						<input
							className='form-input'
							name='addressCompany'
							value={addressCompany || ''}
							onChange={onInputChange}
							type='text'
							required
						/>
					</div>
					<div className='form-user-group'>
						<label>City</label>
						<input
							className='form-input'
							name='city'
							value={city || ''}
							onChange={onInputChange}
							type='text'
							required
						/>
					</div>
					<div className='form-user-group'>
						<label>Country</label>
						<input
							className='form-input'
							name='country'
							value={country || ''}
							onChange={onInputChange}
							type='text'
							required
						/>
					</div>
				</div>
				<div className='form-user-group'>
					<input
						className='buttton-form-user-send'
						type='submit'
						value='Send'
					/>
				</div>
			</form>
		</LayoutModal>
	);
};
