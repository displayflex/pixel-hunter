import AbstractView from './abstract-view';
import {LEVELS} from '../data/game-data';
import {DEBUG, DEBUG_STYLE} from '../data/config';

class GameDoubleView extends AbstractView {
	constructor(images, stats, levelNumber) {
		super();
		this.images = images;
		this.statsTemplate = stats.template;
		this.level = levelNumber;
	}

	get template() {
		return `
			<section class="game">
				<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
				<form class="game__content">
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
					<div class="game__option">
						<img src="${this.images[1].src}" alt="Option 2" width="${this.images[1].width}" height="${this.images[1].height}">
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question2" type="radio" value="photo">
							<span ${DEBUG && LEVELS[this.level].answers[1] === `photo` ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question2" type="radio" value="paint">
							<span ${DEBUG && LEVELS[this.level].answers[1] === `paint` ? DEBUG_STYLE : ``}>Рисунок</span>
						</label>
					</div>
				</form>
				${this.statsTemplate}
			</section>
		`;
	}

	bind() {
		const form = this.element.querySelector(`.game__content`);
		const radioButtons = this.element.querySelectorAll(`.game__answer input[type='radio']`);
		const optionsNubmer = this.element.querySelectorAll(`.game__option`).length;

		const formChangeHadler = (evt) => {
			evt.preventDefault();

			const inputValues = [];
			const checkedInputs = Array.from(radioButtons).filter((it) => {
				if (it.checked) {
					inputValues.push(it.value);
				}

				return it.checked;
			});

			if (checkedInputs.length >= optionsNubmer) {
				this.onAnswer(inputValues);
			}
		};

		form.addEventListener(`change`, formChangeHadler);
	}

	onAnswer() {

	}
}

export default GameDoubleView;
