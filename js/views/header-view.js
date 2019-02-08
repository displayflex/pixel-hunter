import AbstractView from './abstract-view';
import {MAX_LIVES_AMOUNT} from '../data/config';

class HeaderView extends AbstractView {
	constructor(state = ``) {
		super();
		this.state = state;

		if (state) {
			this.timerElement = this.element.querySelector(`.game__timer`);
		}
	}

	get template() {
		return `
			<header class="header">
				${this.addBackButtonTemplate()}
				${this.state ? this.addTimerTemplate(this.state.time) + this.addLivesTemplate(this.state.lives) : ``}
			</header>
		`;
	}

	addBackButtonTemplate() {
		return `
			<button class="back">
				<span class="visually-hidden">Вернуться к началу</span>
				<svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
					<use xlink:href="img/sprite.svg#arrow-left"></use>
				</svg>
				<svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
					<use xlink:href="img/sprite.svg#logo-small"></use>
				</svg>
			</button>
		`.trim();
	}

	addTimerTemplate(time) {
		return `<div class="game__timer">${time}</div>`.trim();
	}

	addLivesTemplate(lives) {
		return `
			<div class="game__lives">
				${new Array(MAX_LIVES_AMOUNT - lives).fill(`
					<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
				`).join(``)}
				${new Array(lives).fill(`
					<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
				`).join(``)}
			</div>
		`.trim();
	}

	updateTime(time) {
		this.timerElement.textContent = time;
	}

	startTimerBlink() {
		this.timerElement.classList.add(`game__timer--animated`);
	}

	bind() {
		const backButton = this.element.querySelector(`.back`);

		backButton.addEventListener(`click`, (evt) => {
			evt.preventDefault();
			this.onClick();
		});
	}

	onClick() {

	}
}

export default HeaderView;
