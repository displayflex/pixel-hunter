import AbstractView from './abstract-view';
import {KeyCode} from '../data/config';
import {DEBUG, DEBUG_STYLE} from '../data/settings';

class GameTripleView extends AbstractView {
	constructor(level, stats) {
		super();
		this.level = level;
		this.statsTemplate = stats.template;
	}

	get template() {
		return `
			<section class="game">
				<p class="game__task">${this.level.question}</p>
				<form class="game__content game__content--triple">
					<div class="game__option" tabindex="0" ${DEBUG && this.isRightAnswer(0) ? DEBUG_STYLE : ``}>
						<img
							src="${this.level.answers[0].image.url}"
							alt="Option 1"
							width="${this.level.answers[0].image.width}"
							height="${this.level.answers[0].image.height}"
						>
					</div>
					<div class="game__option game__option--selected" tabindex="0" ${DEBUG && this.isRightAnswer(1) ? DEBUG_STYLE : ``}>
						<img
							src="${this.level.answers[1].image.url}"
							alt="Option 2"
							width="${this.level.answers[1].image.width}"
							height="${this.level.answers[1].image.height}"
						>
					</div>
					<div class="game__option" tabindex="0" ${DEBUG && this.isRightAnswer(2) ? DEBUG_STYLE : ``}>
						<img
							src="${this.level.answers[2].image.url}"
							alt="Option 3"
							width="${this.level.answers[2].image.width}"
							height="${this.level.answers[2].image.height}"
						>
					</div>
				</form>
				${this.statsTemplate}
			</section>
		`;
	}

	// for debug mode only
	isRightAnswer(index) {
		const answers = this.level.answers.map((it) => it.type);

		return answers.indexOf(answers[index]) === answers.lastIndexOf(answers[index]);
	}

	bind() {
		const answers = this.element.querySelectorAll(`.game__option`);

		answers.forEach((it, index) => {
			it.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onAnswer(index);
			});

			it.addEventListener(`keydown`, (evt) => {
				evt.preventDefault();

				if (evt.keyCode === KeyCode.SPACE || evt.keyCode === KeyCode.ENTER) {
					this.onAnswer(index);
				}
			});
		});
	}

	onAnswer() {

	}
}

export default GameTripleView;
