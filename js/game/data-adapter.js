import resize from './resize';
import {ImageFrame} from '../data/config';

const adaptServerData = (data) => {
	return data.map((it) => {
		const frame = ImageFrame[it.type];

		const changedAnswers = it.answers.map((answer) => {
			const resizedImage = resize(frame, {width: answer.image.width, height: answer.image.height});

			return {
				image: {
					url: answer.image.url,
					width: resizedImage.width,
					height: resizedImage.height
				},
				type: answer.type === `painting` ? `paint` : answer.type
			};
		});

		return {
			type: it.type,
			question: it.question,
			answers: changedAnswers
		}
	});
};

export default adaptServerData;
