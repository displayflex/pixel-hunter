import AbstractView from './abstract-view';

class GameTripleView extends AbstractView {
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
				<p class="game__task">Найдите рисунок среди изображений</p>
				<form class="game__content game__content--triple">
					<div class="game__option" tabindex="0">
						<img src="${this.level.images[0]}" alt="Option 1" width="304" height="455">
					</div>
					<div class="game__option game__option--selected" tabindex="0">
						<img src="${this.level.images[1]}" alt="Option 2" width="304" height="455">
					</div>
					<div class="game__option" tabindex="0">
						<img src="${this.level.images[2]}" alt="Option 3" width="304" height="455">
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
		const answers = this.element.querySelectorAll(`.game__option`);

		answers.forEach((it) => {
			it.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onAnswer([evt.target.alt]);
			});

			it.addEventListener(`keydown`, (evt) => {
				evt.preventDefault();

				const KeyCode = { // тут???
					SPACE: 32,
					ENTER: 13
				};

				if (evt.keyCode === KeyCode.SPACE || evt.keyCode === KeyCode.ENTER) {
					this.onAnswer([evt.target.children[0].alt]);
				}
			});
		});
	}

	onAnswer() {

	}
}

export default GameTripleView;
