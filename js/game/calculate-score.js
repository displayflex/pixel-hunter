import {ExtraPoint, AnswerType, ALL_ANSWERS_AMOUNT, MAX_LIVES_AMOUNT} from '../data/config';

const calculateScore = (answers, livesLeftAmount) => {
	if (!Array.isArray(answers)) {
		throw new Error(`Second parameter should be an array`);
	}

	if (typeof livesLeftAmount !== `number`) {
		throw new Error(`Second parameter should be a number`);
	}

	if (answers.length < ALL_ANSWERS_AMOUNT || answers.length > ALL_ANSWERS_AMOUNT) {
		return -1;
	}

	if (livesLeftAmount < 0 || livesLeftAmount > MAX_LIVES_AMOUNT) {
		return -1;
	}

	const rightAnswersAmount = answers.filter((it) => it.status !== AnswerType.WRONG).length;
	const fastAnswersAmount = answers.filter((it) => it.status === AnswerType.FAST).length;
	const slowAnswersAmount = answers.filter((it) => it.status === AnswerType.SLOW).length;

	const finalScore = (rightAnswersAmount * ExtraPoint.BASE) + (fastAnswersAmount * ExtraPoint.FAST) - (slowAnswersAmount * ExtraPoint.SLOW) + (livesLeftAmount * ExtraPoint.LIFE);

	return {
		correct: rightAnswersAmount,
		fast: fastAnswersAmount,
		slow: slowAnswersAmount,
		finalScore
	};
};

export {calculateScore, ALL_ANSWERS_AMOUNT, MAX_LIVES_AMOUNT, AnswerType, ExtraPoint};
