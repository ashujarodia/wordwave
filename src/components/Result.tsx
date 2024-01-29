import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearState } from '../redux/slice';

const Result = () => {
	const { words, result } = useSelector((state: { root: StateType }) => state.root);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const correctAns: number = result.filter((item, index) => item === words[index].meaning).length;

	const percentage = (correctAns / words.length) * 100;

	const resetHandler = (): void => {
		navigate('/');
		dispatch(clearState());
	};

	return (
		<div className='my-24 mx-auto max-w-md p-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg'>
			<h1 className='text-3xl font-bold mb-6'>Result</h1>
			<div>
				You got {correctAns} right out of {words?.length}
			</div>
			<div className='grid grid-cols-2 gap-4 mb-6'>
				<div>
					<p className='text-lg font-medium'>Your Answers:</p>
					{result.map((ans, index) => (
						<p
							key={index}
							className='mb-2'
						>
							{index + 1}. {ans}
						</p>
					))}
				</div>
				<div>
					<p className='text-lg font-medium'>Correct Answers:</p>
					{words.map((word, index) => (
						<p
							key={index}
							className='mb-2'
						>
							{index + 1}. {word.meaning}
						</p>
					))}
				</div>
			</div>
			<div className='mb-6'>
				<p className='text-lg font-medium'>Result: {percentage > 50 ? 'Pass' : 'Fail'}</p>
			</div>
			<button
				onClick={resetHandler}
				className='bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition duration-300'
			>
				Reset
			</button>
		</div>
	);
};

export default Result;
