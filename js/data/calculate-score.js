const QuestionTime = {
	FAST: 10,
	SLOW: 20
};
const ExtraPoint = {
	BASE: 100,
	FAST: 50,
	SLOW: 50,
	LIFE: 50
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

	const rightAnswersAmount = answers.filter((it) => it.isRight === true).length;
	const fastAnswersAmount = answers.filter((it) => it.isRight === true && it.timeElapsed < QuestionTime.FAST).length;
	const slowAnswersAmount = answers.filter((it) => it.isRight === true && it.timeElapsed > QuestionTime.SLOW).length;

	const points = (rightAnswersAmount * ExtraPoint.BASE) + (fastAnswersAmount * ExtraPoint.FAST) - (slowAnswersAmount * ExtraPoint.SLOW) + (livesLeftAmount * ExtraPoint.LIFE);

	return points;
};

export {calculateScore, ANSWERS_AMOUNT, MAX_LIVES_AMOUNT};
