// const QuestionTime = { // TODO: перенести
// 	FAST: 10,
// 	SLOW: 20
// };
const ExtraPoint = {
	BASE: 100,
	FAST: 50,
	SLOW: 50,
	LIFE: 50
};
const AnswerType = {
	CORRECT: `correct`,
	FAST: `fast`,
	SLOW: `slow`,
	WRONG: `wrong`
};
const ANSWERS_AMOUNT = 10;
const MAX_LIVES_AMOUNT = 3;

const calculateScore = (answers, livesLeftAmount) => {
	if (!Array.isArray(answers)) {
		throw new Error(`Second parameter should be an array`);
	}

	if (typeof livesLeftAmount !== `number`) {
		throw new Error(`Second parameter should be a number`);
	}

	if (answers.length < ANSWERS_AMOUNT || answers.length > ANSWERS_AMOUNT) {
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

export {calculateScore, ANSWERS_AMOUNT, MAX_LIVES_AMOUNT, AnswerType, ExtraPoint};
