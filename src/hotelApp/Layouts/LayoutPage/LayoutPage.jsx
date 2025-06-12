import { Navbar } from '../../../components/Navbar/Navbar';

export const LayoutPage = ({ children }) => {
	return (
		<div className='flex flex-col md:flex-row'>
			<Navbar />
			<main className='w-full md:ml-64 min-h-screen bg-gray-50 p-6'>
				{children}
			</main>
		</div>
	);
};
