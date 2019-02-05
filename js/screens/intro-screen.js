import Application from "../application";
import IntroView from "../views/intro-view";

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

	goNext() {
		Application.showGreeting();
	}
}

export default IntroScreen;
