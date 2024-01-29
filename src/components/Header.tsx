import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className='w-full fixed top-0 left-0 bg-black h-20'>
			<div className='flex justify-center h-full items-center mx-4'>
				<Link
					className='font-bold text-2xl'
					to={'/'}
				>
					WordWave
				</Link>
			</div>
		</div>
	);
};

export default Header;
