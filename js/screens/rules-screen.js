import HeaderView from "../views/header-view";
import Application from "../application";
import RulesView from "../views/rules-view";

class RulesScreen {
	constructor() {
		this.header = new HeaderView();
		this.header.onClick = this.goBack.bind(this);
		this.content = new RulesView();
		this.content.onSubmit = this.goNext.bind(this);

		this.root = document.createElement(`div`);
		this.root.appendChild(this.header.element);
		this.root.appendChild(this.content.element);
	}

	get element() {
		return this.root;
	}

	goBack() {
		Application.showGreeting();
	}

	goNext(playerName) {
		Application.showGame(playerName);
	}
}

export default RulesScreen;
