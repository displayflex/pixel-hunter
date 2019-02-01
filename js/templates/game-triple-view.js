import AbstractView from './abstract-view';
import {KeyCode} from '../data/config';

class GameTripleView extends AbstractView {
	constructor(state, images, header, stats) {
		super();
		this.state = state;
		this.images = images;
		this.header = header.element;
		this.statsTemplate = stats.template;
	}

	get template() {
		return `
			<section class="game">
				<p class="game__task">Найдите рисунок среди изображений</p>
				<form class="game__content game__content--triple">
					<div class="game__option" tabindex="0">
						<img src="${this.images[0].src}" alt="Option 1" width="${this.images[0].width}" height="${this.images[0].height}">
					</div>
					<div class="game__option game__option--selected" tabindex="0">
						<img src="${this.images[1].src}" alt="Option 2" width="${this.images[1].width}" height="${this.images[1].height}">
					</div>
					<div class="game__option" tabindex="0">
						<img src="${this.images[2].src}" alt="Option 3" width="${this.images[2].width}" height="${this.images[2].height}">
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
