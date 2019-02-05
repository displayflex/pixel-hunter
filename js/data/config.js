const KeyCode = {
	SPACE: 32,
	ENTER: 13
};

const ImagesToChoose = {
	ONE: 1,
	TWO: 2,
	THREE: 3
};

const ImageFrame = {
	SINGLE: {
		width: 705,
		height: 455
	},
	DOUBLE: {
		width: 468,
		height: 458
	},
	TRIPLE: {
		width: 304,
		height: 455
	}
};

const QuestionTime = {
	SLOW: 10,
	FAST: 20
};

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

const ALL_ANSWERS_AMOUNT = 10;
const MAX_LIVES_AMOUNT = 3;
const ONE_SECOND = 1000;

export {
	KeyCode,
	QuestionTime,
	ExtraPoint,
	AnswerType,
	ALL_ANSWERS_AMOUNT,
	MAX_LIVES_AMOUNT,
	ImagesToChoose,
	ImageFrame,
	ONE_SECOND
};
