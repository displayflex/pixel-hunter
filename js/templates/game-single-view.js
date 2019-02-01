import AbstractView from './abstract-view';

class GameSingleView extends AbstractView {
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
				<p class="game__task">Угадай, фото или рисунок?</p>
				<form class="game__content game__content--wide">
					<div class="game__option">
						<img src="${this.level.images[0]}" alt="Option 1" width="705" height="455">
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question1" type="radio" value="photo">
							<span>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question1" type="radio" value="paint">
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
