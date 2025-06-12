export const getPostStatus = state => {
	switch (state) {
		case 'DONE':
			return 'bg-gradient-to-r from-emerald-100 to-emerald-300 text-gray-900';
		case 'PENDING':
			return 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900';
		case 'URGENT':
			return 'bg-gradient-to-r from-red-200 to-red-300 text-gray-900';
		case 'PROCESS':
			return 'bg-gradient-to-r from-cyan-200 to-cyan-300 text-gray-900';
		default:
			return '';
	}
};
