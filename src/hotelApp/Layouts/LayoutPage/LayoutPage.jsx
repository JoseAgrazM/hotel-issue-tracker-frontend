import { useSelector } from 'react-redux';
import './layoutPage.css';

export const LayoutPage = ({ children, title }) => {
	const { userLog } = useSelector(state => state.auth);
	
	
	return (
		<>
			<div className='layout-container'>
				<header className='head-layout-page'>
					<h1>{title}</h1>
					{/* <h3 className='dropdown'>
						{userLog.name}🔻
						<div className='dropdown_menu'>
							<button>Logout</button>
						</div>
					</h3> */}
				</header>

				<main className='content-page-main'>{children}</main>
			</div>
		</>
	);
};
