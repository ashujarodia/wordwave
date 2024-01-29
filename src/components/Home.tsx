import { useNavigate } from 'react-router-dom';

const Home = () => {
	const languages = [
		{
			name: 'Japanese',
			code: 'ja',
		},
		{
			name: 'Hindi',
			code: 'hi',
		},
		{
			name: 'Spanish',
			code: 'es',
		},
		{
			name: 'French',
			code: 'fr',
		},
	];

	const navigate = useNavigate();

	const langSelectHandler = (lang: string): void => {
		navigate(`/learn?language=${lang}`);
	};
	return (
		<div className='mt-24'>
			<div className='font-bold text-2xl mb-10'>Which language do you want to learn?</div>
			<div className='grid grid-cols-2 gap-4'>
				{languages.map((lang) => (
					<button
						key={lang.code}
						className=''
						onClick={() => langSelectHandler(lang.code)}
					>
						{lang.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default Home;
