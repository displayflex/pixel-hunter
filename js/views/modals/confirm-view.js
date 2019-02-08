import AbstractView from '../abstract-view';

class ConfirmView extends AbstractView {
	constructor() {
		super();
		this.confirmButton = this.element.querySelector(`#confirm-btn`);
	}

	get template() {
		return `
			<section class="modal">
				<form class="modal__inner">
					<button class="modal__close" type="button" tabindex="3">
						<span class="visually-hidden">Закрыть</span>
					</button>
					<h2 class="modal__title">Подтверждение</h2>
					<p class="modal__text">Вы уверены что хотите начать игру заново?</p>
					<div class="modal__button-wrapper">
						<button class="modal__btn" id="confirm-btn" tabindex="1">Ок</button>
						<button class="modal__btn" id="cancel-btn" tabindex="2">Отмена</button>
					</div>
				</form>
			</section>
		`;
	}

	bind() {
		const confirmButton = this.element.querySelector(`#confirm-btn`);
		const cancelButton = this.element.querySelector(`#cancel-btn`);
		const closeButton = this.element.querySelector(`.modal__close`);

		confirmButton.addEventListener(`click`, (evt) => {
			evt.preventDefault();
			this.onComfirm();
		});

		cancelButton.addEventListener(`click`, (evt) => {
			evt.preventDefault();
			this.onCancel();
		});

		closeButton.addEventListener(`click`, (evt) => {
			evt.preventDefault();
			this.onCancel();
		});
	}

	onComfirm() {

	}

	onCancel() {

	}
}

export default ConfirmView;
