import './RowRoomForm.css';

export const RowRoomForm = ({
	room,
	index,
	onInputChange,
	onRemoveRowForm,
}) => {
	return (
		<section className='room-entry'>
			<div className='form-room-group'>
				<label>Nombre</label>
				<input
					name='nameRoom'
					value={room.nameRoom}
					onChange={e => onInputChange(index, e)}
					className={`form_input_rooms border `}
					type='text'
					placeholder='Name room'
					required
				/>
			</div>
			<div className='form-room-group'>
				<label>Planta</label>
				<input
					name='floor'
					value={room.floor}
					onChange={e => onInputChange(index, e)}
					className='form_input_rooms border '
					type='number'
					required
				/>
			</div>
			<div className='form-room-group'>
				<label>Tipo</label>
				<select
					name='typeRoom'
					value={room.typeRoom || ''}
					onChange={e => onInputChange(index, e)}
					className='form_input_rooms border '
					required
				>
					<option value='' disabled>
						Select a type
					</option>
					<option value='BASIC'>Basic</option>
					<option value='PREMIUM'>Premium</option>
					<option value='SUITE'>Suite</option>
				</select>
			</div>
			<div className='form-room-group'>
				<label>Description</label>
				<input
					name='description'
					value={room.description}
					onChange={e => onInputChange(index, e)}
					className='form_input_rooms border'
					type='text'
					required
					maxLength='250'
				/>
			</div>
			<div className='form-room-group'>
				<button
					className='remove-row-room'
					onClick={e => onRemoveRowForm(e, index)}
				>
					❌
				</button>
				<div className='char_counter_room'>
					{room.description?.length || 0}/250
				</div>
			</div>
		</section>
	);
};
