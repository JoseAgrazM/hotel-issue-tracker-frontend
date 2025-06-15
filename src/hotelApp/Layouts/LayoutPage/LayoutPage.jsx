import { Navbar } from '../../../components/Navbar/Navbar';

export const LayoutPage = ({ children }) => {
	return (
		<div className='flex flex-col md:flex-row'>
			<Navbar />
			<main className='w-full md:ml-52 min-h-screen bg-gray-50 px-4 py-6 h-screen overflow-y-scroll'>
				{children}
			</main>
		</div>
	);
};
