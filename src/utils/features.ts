import axios from 'axios';
import { generate } from 'random-words';
import _ from 'lodash';

const generateMCQ = (
	meaning: {
		Text: string;
	}[],
	index: number
): string[] => {
	const correctAns: string = meaning[index].Text;
	const allMeaningExceptForCorrect = meaning.filter((i) => i.Text !== correctAns);
	const incorrectOptions: string[] = _.sampleSize(allMeaningExceptForCorrect, 3).map((i) => i.Text);
	const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);
	return mcqOptions;
};

export const translateWords = async (params: LangType): Promise<WordType[]> => {
	const key = import.meta.env.VITE_TRANSLATE_API;

	try {
		const words: { Text: string }[] = (generate(8) as string[]).map((i) => ({
			Text: i,
		}));

		const response = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate', words, {
			params: {
				'to[0]': params,
				'api-version': '3.0',
				profanityAction: 'NoAction',
				textType: 'plain',
			},
			headers: {
				'content-type': 'application/json',
				'X-RapidAPI-Key': key,
				'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
			},
		});
		const recieve: FetchedDataType[] = response.data;

		const arr: WordType[] = recieve.map((i, index) => {
			const options: string[] = generateMCQ(words, index);
			return {
				word: i.translations[0].text,
				meaning: words[index].Text,
				options,
			};
		});

		return arr;
	} catch (error) {
		console.error(error);
		throw new Error('Some Error');
	}
};

export const fetchAudio = async (text: string, language: LangType): Promise<string> => {
	const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
	const rapidKey = import.meta.env.VITE_RAPID_API;
	const encodedParams = new URLSearchParams({
		src: text,
		hl: language,
		r: '0',
		c: 'mp3',
		f: '8khz_8bit_mono',
		b64: 'true',
	});
	if (language === 'ja') {
		encodedParams.set('hl', 'ja-jp');
	} else if (language === 'es') {
		encodedParams.set('hl', 'es-es');
	} else if (language === 'fr') {
		encodedParams.set('hl', 'fr-fr');
	} else {
		encodedParams.set('hl', 'hi-in');
	}

	const { data }: { data: string } = await axios.post('https://voicerss-text-to-speech.p.rapidapi.com/', encodedParams, {
		params: { key },
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': rapidKey,
			'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com',
		},
	});
	return data;
};
