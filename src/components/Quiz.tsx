import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveResult } from '../redux/slice';

const Quiz = () => {
	const [result, setResult] = useState<string[]>([]);
	const [count, setCount] = useState<number>(0);
	const [ans, setAns] = useState<string>('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { words } = useSelector((state: { root: StateType }) => state.root);

	const nextHandler = (): void => {
		console.log(ans);
		setResult((prev) => [...prev, ans]);
		setCount((prev) => prev + 1);
		setAns('');
	};

	useEffect(() => {
		if (count + 1 > words.length) {
			navigate('/result');
		}
		dispatch(saveResult(result));
	}, [result]);

	return (
		<div className='my-24 mx-auto max-w-md p-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg'>
			<h1 className='text-3xl font-bold mb-6'>Quiz Time!</h1>
			<div className='text-lg mb-8'>
				<span className='text-gray-200'>{count + 1} - </span>
				<span className='text-gray-300'>{words[count]?.word}</span>
			</div>
			<div>
				<p className='mb-4 text-lg font-medium'>What's the meaning?</p>
				{words[count]?.options.map((item) => (
					<label
						className='flex items-center mb-4'
						key={item}
					>
						<input
							type='radio'
							name='quizOption'
							value={item}
							className='mr-2 text-purple-500'
							checked={ans === item}
							onChange={(e) => setAns(e.target.value)}
						/>
						{item}
					</label>
				))}
				<button
					onClick={nextHandler}
					className='bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition duration-300'
					disabled={ans === ''}
				>
					{count === words.length - 1 ? 'Submit' : 'Next'}
				</button>
			</div>
		</div>
	);
};

export default Quiz;
