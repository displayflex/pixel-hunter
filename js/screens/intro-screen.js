import IntroView from "../views/intro-view";
import Application from "../application";

class IntroScreen {
	constructor() {
		this.content = new IntroView();
		this.content.onClick = this.goNext.bind(this);

		this.root = document.createElement(`div`);
		this.root.appendChild(this.content.element);
	}

	get element() {
		return this.root;
	}

	enableButton() {
		this.content.enableButton();
	}

	goNext() {
		this.content.addAnimation();
		Application.showGreeting(true);
	}
}

export default IntroScreen;
