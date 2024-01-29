import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAudio, translateWords } from '../utils/features';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, getWordsFail, getWordsRequest, getWordsSuccess } from '../redux/slice';
import Loader from './Loader';

const Learning = () => {
	const [count, setCount] = useState<number>(0);
	const [audioSrc, setAudioSrc] = useState<string>('');

	const audioRef = useRef(null);

	const params = useSearchParams()[0].get('language') as LangType;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const audioHandler = async () => {
		const player: HTMLAudioElement = audioRef.current!;
		if (player) {
			player.play();
		} else {
			const data = await fetchAudio(words[count]?.word, params);
			setAudioSrc(data);
		}
	};

	const nextHandler = (): void => {
		setCount((prev) => prev + 1);
		setAudioSrc('');
	};

	const backHandler = (): void => {
		if (count === 0) {
			navigate('/');
		} else {
			setCount((prev) => prev - 1);
		}
		setAudioSrc('');
	};

	const { loading, error, words } = useSelector((state: { root: StateType }) => state.root);

	useEffect(() => {
		dispatch(getWordsRequest());
		translateWords(params || 'hi')
			.then((arr) => dispatch(getWordsSuccess(arr)))
			.catch((err) => dispatch(getWordsFail(err)));
		if (error) {
			alert(error);
			dispatch(clearState());
		}
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='my-24 mx-auto max-w-md px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 border rounded-lg shadow-lg relative'>
			{audioSrc && (
				<audio
					src={audioSrc}
					autoPlay
					ref={audioRef}
				></audio>
			)}
			<button
				onClick={backHandler}
				className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 mb-4 absolute left-6'
			>
				&larr;
			</button>
			<div className='flex items-center gap-4 flex-wrap mt-14'>
				<span className='text-2xl font-bold text-white'>{count + 1} - </span>
				<span className='text-2xl font-bold text-white'>{words[count]?.word} : </span>
				<span className='text-2xl font-bold text-white'>{words[count]?.meaning}</span>

				<button
					className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300'
					onClick={audioHandler}
				>
					Speak 🔊
				</button>
			</div>
			<button
				onClick={count === 7 ? () => navigate('/quiz') : nextHandler}
				className='w-full mt-8 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300'
			>
				{count === words.length - 1 ? 'Take Quiz' : 'Next'}
			</button>
		</div>
	);
};

export default Learning;
