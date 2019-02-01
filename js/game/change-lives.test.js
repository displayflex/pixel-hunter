import {assert} from 'chai';
import changeLives from './change-lives';

describe(`Change lives`, () => {
	it(`should decrease lives by 1`, () => {
		assert.deepEqual(changeLives({time: 30, lives: 3, level: 0, answers: []}), {time: 30, lives: 2, level: 0, answers: []});
		assert.deepEqual(changeLives({time: 30, lives: 1, level: 0, answers: []}), {time: 30, lives: 0, level: 0, answers: []});
		assert.deepEqual(changeLives({time: 30, lives: 9, level: 0, answers: []}), {time: 30, lives: 8, level: 0, answers: []});
	});

	it(`shouldn't allow to set zero or negative lives`, () => {
		assert.throws(() => changeLives({time: 30, lives: 0, level: 0, answers: []}), `Lives should be a positive number`);
		assert.throws(() => changeLives({time: 30, lives: -1, level: 0, answers: []}), `Lives should be a positive number`);
	});

	it(`lives should be a number`, () => {
		assert.throws(() => changeLives({time: 30, lives: false, level: 0, answers: []}), `Lives should be a number`);
		assert.throws(() => changeLives({time: 30, lives: [], level: 0, answers: []}), `Lives should be a number`);
		assert.throws(() => changeLives({time: 30, lives: {}, level: 0, answers: []}), `Lives should be a number`);
		assert.throws(() => changeLives({time: 30, lives: undefined, level: 0, answers: []}), `Lives should be a number`);
		assert.throws(() => changeLives({time: 30, lives: ``, level: 0, answers: []}), `Lives should be a number`);
	});
});
