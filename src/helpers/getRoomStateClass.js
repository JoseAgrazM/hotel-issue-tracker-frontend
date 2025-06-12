export const getRoomStateClass = state => {
	switch (state) {
		case 'AVAILABLE':
			return 'bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 text-gray-900';
		case 'OCCUPIED':
			return 'bg-gradient-to-r from-red-300 via-red-400 to-red-500 text-gray-900';
		case 'BLOCKED':
			return 'bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-gray-900';
		default:
			return '';
	}
};
