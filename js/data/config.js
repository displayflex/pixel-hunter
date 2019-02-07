const KeyCode = {
	SPACE: 32,
	ENTER: 13
};

const Status = {
	OK: 200,
	REDIRECT: 300
};

const DataURL = {
	LOAD: `https://es.dump.academy/pixel-hunter/questions`
};

const QuestionType = {
	TWO_OF_TWO: `two-of-two`,
	TINDER_LIKE: `tinder-like`,
	ONE_OF_THREE: `one-of-three`
};

const ImageFrame = {
	[QuestionType.TINDER_LIKE]: {
		width: 705,
		height: 455
	},
	[QuestionType.TWO_OF_TWO]: {
		width: 468,
		height: 458
	},
	[QuestionType.ONE_OF_THREE]: {
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
	ImageFrame,
	ONE_SECOND,
	QuestionType,
	Status,
	DataURL
};
