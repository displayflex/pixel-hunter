import {INITIAL_STATE} from '../data/config';
import increaseLevel from '../game/increase-level';
import changeLives from '../game/change-lives';

class GameModel {
	constructor(data, playerName) {
		this.data = data;
		this.playerName = playerName;
		this.restart();
	}

	get state() {
		return Object.freeze(this._state);
	}

	hasNextLevel() {
		return this.data[this._state.level + 1] !== void 0;
	}

	nextLevel() {
		this._state = increaseLevel(this._state);
	}

	decreaseLives() {
		this._state = changeLives(this._state);
	}

	addAnswer(type, time) {
		this._state.answers.push({status: type, timeElapsed: time});
	}

	restart() {
		this._state = Object.assign({}, INITIAL_STATE, {answers: []});
	}

	resetTime() {
		this._state = Object.assign({}, this._state, {time: INITIAL_STATE.time});
	}

	isTimeExpired() {
		return this._state.time <= 0;
	}

	isDead() {
		return this._state.lives <= 0;
	}

	getCurrentLevel() {
		return this.data[this._state.level];
	}

	tick() {
		this._state = Object.assign({}, this._state, {time: this._state.time - 1});
	}
}

export default GameModel;
