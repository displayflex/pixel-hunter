import HeaderView from "../views/header-view";
import Application from "../application";
import {AnswerType, ImagesToChoose, ONE_SECOND, QuestionTime} from '../data/config';
import GameSingleView from "../views/game-single-view";
import GameDoubleView from "../views/game-double-view";
import GameTripleView from "../views/game-triple-view";
import StatsView from "../views/stats-view";
import {getResizedImages} from '../game/resize';

class GameScreen {
	constructor(model) {
		this.model = model;

		this.header = new HeaderView(this.model.state);
		this.stats = new StatsView(this.model.state.answers);
		this.content = this.chooseGameType(this.model.getCurrentLevel().images);

		this.root = document.createElement(`div`);
		this.root.appendChild(this.header.element);
		this.root.appendChild(this.content.element);

		this._timer = null;

		this.headerInit();
	}

	get element() {
		return this.root;
	}

	headerInit() {
		this.header.onClick = this.goBack.bind(this);
		this.timerValue = this.header.element.querySelector(`.game__timer`).textContent; // FIXME: ?
	}

	chooseGameType(images) {
		let level;

		switch (images.length) {
			case ImagesToChoose.ONE:
				level = new GameSingleView(getResizedImages(images), this.stats);
				break;

			case ImagesToChoose.TWO:
				level = new GameDoubleView(getResizedImages(images), this.stats);
				break;

			case ImagesToChoose.THREE:
				level = new GameTripleView(getResizedImages(images), this.stats);
				break;

			default:
				throw new Error(`Invalid type of game`);
		}

		return level;
	}

	_tick() {
		this.model.tick();
		this.updateHeader();
		this._timer = setTimeout(() => this._tick(), ONE_SECOND);
		this.checkTimer();
	}

	checkTimer() {
		if (this.model.isTimeExpired()) {
			this.answer(false);
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

	isRightAnswer(userAnswer, levelAnswer) {
		return JSON.stringify(userAnswer) === JSON.stringify(levelAnswer);
	}

	getCorrectAnswerStatus(time) {
		if (time < QuestionTime.SLOW) {
			return AnswerType.SLOW;
		} else if (time <= QuestionTime.FAST) {
			return AnswerType.CORRECT;
		}

		return AnswerType.FAST;
	}

	answer(answer) {
		this.stopGame();

		if (!answer || !this.isRightAnswer(answer, this.model.getCurrentLevel().answers)) {
			this.model.decreaseLives();
			this.model.addAnswer(AnswerType.WRONG, this.timerValue);
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
		this.headerInit();
	}

	changeLevel() {
		this.updateHeader();
		const level = this.chooseGameType(this.model.getCurrentLevel().images);
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

	goBack() {
		this.model.restart();
		Application.showGreeting();
	}
}

export default GameScreen;
