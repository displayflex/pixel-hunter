import AbstractView from './abstract-view';

class IntroView extends AbstractView {
	get template() {
		return `
			<section class="intro">
				<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
				<p class="intro__motto">
					<sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
				</p>
			</section>
		`;
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
