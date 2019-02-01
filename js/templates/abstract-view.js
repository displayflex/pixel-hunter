import {getElementFromTemplate} from '../utils';

class AbstractView {
	constructor() {
		if (new.target === AbstractView) {
			throw new Error(`Cant instantiate AbstractView, only concrete one`);
		}
	}

	get template() {
		throw new Error(`Template should be defined for view`);
	}

	get element() {
		if (!this._element) {
			this._element = this.render();
			this.bind();
		}

		return this._element;
	}

	render() {
		return getElementFromTemplate(this.template); // перенести методы из utils сюда??
	}

	bind() {
		// bind handlers if required
	}
}

export default AbstractView;
