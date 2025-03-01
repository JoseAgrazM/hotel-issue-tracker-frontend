export const getRoomStateClass = state => {
	switch (state) {
		case 'AVAILABLE':
			return 'stateAvailable';
		case 'OCCUPIED':
			return 'stateOccupied';
		case 'BLOCKED':
			return 'stateBlocked';
		default:
			return '';
	}
};
