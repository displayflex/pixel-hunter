import {assert} from 'chai';
import {changeLives, initialGame} from './change-lives';

describe(`Change lives`, () => {
	it(`should change lives`, () => {
		assert.equal(changeLives(initialGame, 1).lives, 1);
		assert.equal(changeLives(initialGame, 0).lives, 0);
		assert.equal(changeLives(initialGame, 3).lives, 3);
	});

	it(`shouldn't allow to set negative lives`, () => {
		assert.throws(() => changeLives(initialGame, -1));
	});

	it(`should have 3 lives on start`, () => {
		assert.equal(initialGame.lives, 3);
	});

	it(`shouldn't allow to set non number lives`, () => {
		assert.throws(() => changeLives(initialGame, ``).lives, `Lives should be a number`);
		assert.throws(() => changeLives(initialGame, []).lives, `Lives should be a number`);
		assert.throws(() => changeLives(initialGame, undefined).lives, `Lives should be a number`);
	});
});
