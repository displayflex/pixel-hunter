import {assert} from 'chai';
import increaseLevel from './increase-level';

describe(`Change level`, () => {
	it(`should increase level by 1`, () => {
		assert.deepEqual(increaseLevel({time: 30, lives: 3, level: 0, answers: []}), {time: 30, lives: 3, level: 1, answers: []});
		assert.deepEqual(increaseLevel({time: 30, lives: 3, level: 5, answers: []}), {time: 30, lives: 3, level: 6, answers: []});
		assert.deepEqual(increaseLevel({time: 30, lives: 3, level: 9, answers: []}), {time: 30, lives: 3, level: 10, answers: []});
	});

	it(`level shouldn't be a negative number`, () => {
		assert.throws(() => increaseLevel({time: 30, lives: 3, level: -1, answers: []}), `Level shouldn't be a negative number`);
	});

	it(`level should be a number`, () => {
		assert.throws(() => increaseLevel({time: 30, lives: 3, level: false, answers: []}), `Level should be a number`);
		assert.throws(() => increaseLevel({time: 30, lives: 3, level: [], answers: []}), `Level should be a number`);
		assert.throws(() => increaseLevel({time: 30, lives: 3, level: {}, answers: []}), `Level should be a number`);
		assert.throws(() => increaseLevel({time: 30, lives: 3, level: undefined, answers: []}), `Level should be a number`);
		assert.throws(() => increaseLevel({time: 30, lives: 3, level: ``, answers: []}), `Level should be a number`);
	});
});
