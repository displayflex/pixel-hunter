import AbstractView from './abstract-view';
import {DEBUG, DEBUG_STYLE} from '../settings';
import {AnswerType} from '../game/config';

class GameDoubleView extends AbstractView {
	constructor(level, stats) {
		super();
		this.level = level;
		this.statsTemplate = stats.template;
	}

	get template() {
		return `
			<section class="game">
				<p class="game__task">${this.level.question}</p>
				<form class="game__content">
					<div class="game__option">
						<img
							src="${this.level.answers[0].image.url}"
							alt="Option 1"
							width="${this.level.answers[0].image.width}"
							height="${this.level.answers[0].image.height}"
						>
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question1" type="radio" value="photo">
							<span ${DEBUG && this.level.answers[0].type === AnswerType.PHOTO ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question1" type="radio" value="paint">
							<span ${DEBUG && this.level.answers[0].type === AnswerType.PAINTING ? DEBUG_STYLE : ``}>Рисунок</span>
						</label>
					</div>
					<div class="game__option">
						<img
							src="${this.level.answers[1].image.url}"
							alt="Option 2"
							width="${this.level.answers[1].image.width}"
							height="${this.level.answers[1].image.height}"
						>
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question2" type="radio" value="photo">
							<span ${DEBUG && this.level.answers[1].type === AnswerType.PHOTO ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question2" type="radio" value="paint">
							<span ${DEBUG && this.level.answers[1].type === AnswerType.PAINTING ? DEBUG_STYLE : ``}>Рисунок</span>
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
