import {assert} from 'chai';
import {calculateScore} from './calculate-score';
import {Result, ALL_ANSWERS_AMOUNT, MAX_LIVES_AMOUNT} from './config';

describe(`Calculate score`, () => {
	// Correct data
	it(`should calculate score correctly`, () => {
		let answers = [];
		// Возвращает 1150 очков, если ответил на все вопросы и не быстро, и не медленно, остались все 3 жизни
		answers = new Array(ALL_ANSWERS_AMOUNT).fill({status: Result.CORRECT, timeElapsed: 15});
		assert.deepEqual(calculateScore(answers, 3), {correct: 10, fast: 0, slow: 0, finalScore: 1150});

		// Возвращает 1650 очков, если ответил на все вопросы быстро, остались все 3 жизни
		answers = new Array(ALL_ANSWERS_AMOUNT).fill({status: Result.FAST, timeElapsed: 5});
		assert.deepEqual(calculateScore(answers, 3), {correct: 10, fast: 10, slow: 0, finalScore: 1650});

		// Возвращает 650 очков, если ответил на все вопросы медленно, остались все 3 жизни
		answers = new Array(ALL_ANSWERS_AMOUNT).fill({status: Result.SLOW, timeElapsed: 25});
		assert.deepEqual(calculateScore(answers, 3), {correct: 10, fast: 0, slow: 10, finalScore: 650});

		// Возвращает 1000 очков, если ответил на все вопросы и не быстро, и не медленно, не осталось жизней
		answers = new Array(ALL_ANSWERS_AMOUNT).fill({status: Result.CORRECT, timeElapsed: 15});
		assert.deepEqual(calculateScore(answers, 0), {correct: 10, fast: 0, slow: 0, finalScore: 1000});

		// Возвращает 1050 очков, если ответил на все вопросы и не быстро, и не медленно, осталась 1 жизнь
		answers = new Array(ALL_ANSWERS_AMOUNT).fill({status: Result.CORRECT, timeElapsed: 15});
		assert.deepEqual(calculateScore(answers, 1), {correct: 10, fast: 0, slow: 0, finalScore: 1050});
	});

	// Incorrect data
	it(`should return -1 if answers amount less then ${ALL_ANSWERS_AMOUNT}`, () => {
		const answers = new Array(ALL_ANSWERS_AMOUNT - 1).fill({status: Result.CORRECT, timeElapsed: 15});

		assert.equal(calculateScore(answers, 2), -1);
	});

	it(`should return -1 if answers amount more then ${ALL_ANSWERS_AMOUNT}`, () => {
		const answers = new Array(ALL_ANSWERS_AMOUNT + 1).fill({status: Result.CORRECT, timeElapsed: 15});

		assert.equal(calculateScore(answers, 2), -1);
	});

	it(`should return -1 if livesLeftAmount amount less then 0 or more then ${MAX_LIVES_AMOUNT}`, () => {
		const answers = new Array(ALL_ANSWERS_AMOUNT).fill({status: Result.CORRECT, timeElapsed: 15});

		assert.equal(calculateScore(answers, -1), -1);
		assert.equal(calculateScore(answers, 4), -1);
	});

	// Invalid data
	it(`should thow an error if second parameter is not a number`, () => {
		const answers = new Array(ALL_ANSWERS_AMOUNT).fill({status: Result.CORRECT, timeElapsed: 15});

		assert.throws(() => calculateScore(answers, `0`), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, ``), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, []), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, {}), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, undefined), `Second parameter should be a number`);
	});

	it(`should thow an error if first parameter is not an array `, () => {
		assert.throws(() => calculateScore({}, 3), `First parameter should be an array`);
		assert.throws(() => calculateScore(``, 3), `First parameter should be an array`);
		assert.throws(() => calculateScore(1, 3), `First parameter should be an array`);
		assert.throws(() => calculateScore(undefined, 3), `First parameter should be an array`);
	});
});
