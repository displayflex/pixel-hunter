import IntroView from "../views/intro-view";

class IntroScreen {
	constructor() {
		this.content = new IntroView();

		this.root = document.createElement(`div`);
		this.root.appendChild(this.content.element);
	}

	get element() {
		return this.root;
	}

	addAnimation() {
		this.content.addAnimation();
	}
}

export default IntroScreen;
