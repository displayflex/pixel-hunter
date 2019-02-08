import HeaderView from "../views/header-view";
import ResultsView from "../views/results-view";
import Application from "../application";

class ResultsScreen {
	constructor(model) {
		this.model = model;

		this.header = new HeaderView(this.model.state);
		this.header.onClick = this.goBack.bind(this);
		this.content = new ResultsView();

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

	showScores(data) {
		this.content.showScores(data);
	}
}

export default ResultsScreen;
