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
				<label>Name</label>
				<input
					name='nameRoom'
					value={room.nameRoom}
					onChange={e => onInputChange(index, e)}
					className={`form_input_rooms`}
					type='text'
					placeholder='Name room'
					required
				/>
			</div>

			<div className='form-room-group'>
				<label>Floor</label>
				<input
					name='floor'
					value={room.floor}
					onChange={e => onInputChange(index, e)}
					className='form_input_rooms'
					type='number'
					required
				/>
			</div>
			<div className='form-room-group'>
				<label>Type room</label>
				<select
					name='typeRoom'
					value={room.typeRoom || ''}
					onChange={e => onInputChange(index, e)}
					className='form_input_rooms'
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
					className='form_input_rooms'
					type='text'
					required
				/>
			</div>
			<button
				className='remove-row-room'
				onClick={e => onRemoveRowForm(e, index)}
			>
				❌
			</button>
		</section>
	);
};
