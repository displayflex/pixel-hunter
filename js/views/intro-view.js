import AbstractView from './abstract-view';

class IntroView extends AbstractView {
	constructor() {
		super();
		this.nextButton = this.element.querySelector(`.intro__asterisk`);
		this.loading = this.element.querySelector(`.intro__loading`);
		this.disableButton();
	}

	get template() {
		return `
			<section class="intro">
				<p class="intro__loading">Loading...</p>
				<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
				<p class="intro__motto">
					<sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
				</p>
			</section>
		`;
	}

	addAnimation() {
		this.element.classList.add(`intro--animated`);
	}

	disableButton() {
		this.nextButton.style = `display: none`;
	}

	enableButton() {
		this.loading.style = `display: none`;
		this.nextButton.removeAttribute(`style`);
	}

	bind() {
		const nextButton = this.element.querySelector(`.intro__asterisk`);

		nextButton.addEventListener(`click`, (evt) => {
			evt.preventDefault();
			this.onClick();
		});
	}

	onClick() {

	}
}

export default IntroView;
