import AbstractView from './abstract-view';
import {DEBUG, DEBUG_STYLE} from '../data/settings';

class GameSingleView extends AbstractView {
	constructor(level, stats) {
		super();
		this.level = level;
		this.statsTemplate = stats.template;
	}

	get template() {
		return `
			<section class="game">
				<p class="game__task">${this.level.question}</p>
				<form class="game__content game__content--wide">
					<div class="game__option">
						<img
							src="${this.level.answers[0].image.url}"
							alt="Option 1"
							width="${this.level.answers[0].image.width}"
							height="${this.level.answers[0].image.height}"
						>
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question1" type="radio" value="photo">
							<span ${DEBUG && this.level.answers[0].type === `photo` ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question1" type="radio" value="paint">
							<span ${DEBUG && this.level.answers[0].type === `paint` ? DEBUG_STYLE : ``}>Рисунок</span>
						</label>
					</div>
				</form>
				${this.statsTemplate}
			</section>
		`;
	}

	bind() {
		const radioButtons = this.element.querySelectorAll(`.game__answer input[type='radio']`);

		radioButtons.forEach((it) => {
			it.addEventListener(`change`, (evt) => {
				evt.preventDefault();
				this.onAnswer([evt.target.value]);
			});
		});
	}

	onAnswer() {

	}
}

export default GameSingleView;
