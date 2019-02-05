import Application from "../application";
import GreetingView from "../views/greeting-view";

class GreetingScreen {
	constructor() {
		this.content = new GreetingView();
		this.content.onClick = this.goNext.bind(this);

		this.root = document.createElement(`div`);
		this.root.appendChild(this.content.element);
	}

	get element() {
		return this.root;
	}

	goNext() {
		Application.showRules();
	}
}

export default GreetingScreen;
