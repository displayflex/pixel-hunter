import AbstractView from './abstract-view';
import {LEVELS} from '../data/game-data';
import {DEBUG, DEBUG_STYLE} from '../data/config';

class GameSingleView extends AbstractView {
	constructor(images, stats, levelNumber) {
		super();
		this.images = images;
		this.statsTemplate = stats.template;
		this.level = levelNumber;
	}

	get template() {
		return `
			<section class="game">
				<p class="game__task">Угадай, фото или рисунок?</p>
				<form class="game__content game__content--wide">
					<div class="game__option">
						<img src="${this.images[0].src}" alt="Option 1" width="${this.images[0].width}" height="${this.images[0].height}">
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question1" type="radio" value="photo">
							<span ${DEBUG && LEVELS[this.level].answers[0] === `photo` ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question1" type="radio" value="paint">
							<span ${DEBUG && LEVELS[this.level].answers[0] === `paint` ? DEBUG_STYLE : ``}>Рисунок</span>
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
