import HeaderView from "../views/header-view";
import Application from "../application";
import {Result, ONE_SECOND, BLINK_TIME, QuestionTime, QuestionType} from '../game/config';
import GameSingleView from "../views/game-single-view";
import GameDoubleView from "../views/game-double-view";
import GameTripleView from "../views/game-triple-view";
import StatsView from "../views/stats-view";
import ConfirmView from "../views/modals/confirm-view";

class GameScreen {
	constructor(model) {
		this.model = model;

		this.header = new HeaderView(this.model.state);
		this.header.onClick = this.showModal.bind(this);
		this.stats = new StatsView(this.model.state.answers);
		this.confirm = new ConfirmView();

		this.level = this.model.getCurrentLevel();
		this.content = this.chooseGameType(this.level.type);
		this.level.onAnswer = this.answer.bind(this);

		this.root = document.createElement(`div`);
		this.root.appendChild(this.header.element);
		this.root.appendChild(this.content.element);

		this._timer = null;
		this.timerValue = this.header.timerElement.textContent;
	}

	get element() {
		return this.root;
	}

	chooseGameType(type) {
		let level;

		switch (type) {
			case QuestionType.TINDER_LIKE:
				level = new GameSingleView(this.level, this.stats);
				break;

			case QuestionType.TWO_OF_TWO:
				level = new GameDoubleView(this.level, this.stats);
				break;

			case QuestionType.ONE_OF_THREE:
				level = new GameTripleView(this.level, this.stats);
				break;

			default:
				throw new Error(`Invalid type of game`);
		}

		return level;
	}

	_tick() {
		this.model.tick();
		this.header.updateTime(this.model.state.time);
		this._timer = setTimeout(() => this._tick(), ONE_SECOND);
		this.checkTimer();
	}

	checkTimer() {
		if (this.model.isTimeExpired()) {
			this.answer(false);
		}

		if (this.model.state.time <= BLINK_TIME) {
			this.header.startTimerBlink();
		}
	}

	startGame() {
		this.changeLevel();
		this.model.resetTime();
		this._tick();
	}

	stopGame() {
		clearInterval(this._timer);
	}

	getArrayOfAnswers(level) {
		return level.answers.map((it) => it.type);
	}

	/**
	 * Checks if answer is right.
	 * Answer type can be "Array" for TINDER_LIKE & TWO_OF_TWO type of game or "string" for ONE_OF_THREE.
	 * @param {*} answer
	 * @return {boolean}
	 */
	isRightAnswer(answer) {
		const levelAnswers = this.getArrayOfAnswers(this.level);

		if (this.level.type === QuestionType.ONE_OF_THREE) {
			return levelAnswers.indexOf(levelAnswers[answer]) === levelAnswers.lastIndexOf(levelAnswers[answer]);
		}

		return JSON.stringify(answer) === JSON.stringify(levelAnswers);
	}

	getCorrectAnswerStatus(time) {
		if (time < QuestionTime.SLOW) {
			return Result.SLOW;
		} else if (time <= QuestionTime.FAST) {
			return Result.CORRECT;
		}

		return Result.FAST;
	}

	answer(answer) {
		this.stopGame();
		this.timerValue = this.header.timerElement.textContent;

		if (!answer || !this.isRightAnswer(answer)) {
			this.model.decreaseLives();
			this.model.addAnswer(Result.WRONG, this.timerValue);
		} else {
			this.model.addAnswer(this.getCorrectAnswerStatus(this.timerValue), this.timerValue);
		}

		if (!this.model.hasNextLevel() || this.model.isDead()) {
			this.endGame();
		} else {
			this.model.nextLevel();
			this.startGame();
		}
	}

	updateHeader() {
		const header = new HeaderView(this.model.state);
		this.root.replaceChild(header.element, this.header.element);
		this.header = header;
		this.header.onClick = this.showModal.bind(this);
	}

	changeLevel() {
		this.updateHeader();

		this.level = this.model.getCurrentLevel();
		const level = this.chooseGameType(this.level.type);
		level.onAnswer = this.answer.bind(this);
		this.changeContentView(level);
	}

	endGame() {
		Application.showResults(this.model);
	}

	changeContentView(view) {
		this.root.replaceChild(view.element, this.content.element);
		this.content = view;
	}

	exit() {
		this.model.restart();
		Application.showGreeting();
		document.body.removeChild(this.confirm.element);
	}

	showModal() {
		document.body.appendChild(this.confirm.element);
		this.confirm.confirmButton.focus();
		this.confirm.onComfirm = () => this.exit();
		this.confirm.onCancel = () => document.body.removeChild(this.confirm.element);
	}
}

export default GameScreen;
