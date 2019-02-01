import AbstractView from './abstract-view';

class GameDoubleView extends AbstractView {
	constructor(state, levelData, header, stats) {
		super();
		this.state = state;
		this.level = levelData;
		this.header = header.element;
		this.statsTemplate = stats.template;
	}

	get template() {
		return `
			<section class="game">
				<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
				<form class="game__content">
					<div class="game__option">
						<img src="${this.level.images[0]}" alt="Option 1" width="468" height="458">
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question1" type="radio" value="photo">
							<span>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question1" type="radio" value="paint">
							<span>Рисунок</span>
						</label>
					</div>
					<div class="game__option">
						<img src="${this.level.images[1]}" alt="Option 2" width="468" height="458">
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question2" type="radio" value="photo">
							<span>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question2" type="radio" value="paint">
							<span>Рисунок</span>
						</label>
					</div>
				</form>
				${this.statsTemplate}
			</section>
		`;
	}

	render() {
		const element = super.render();
		element.insertAdjacentElement(`afterbegin`, this.header.childNodes[0]);

		return element;
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
