import HeaderView from "../views/header-view";
import StatsView from "../views/stats-view";
import ResultsView from "../views/results-view";
import Application from "../application";
import {calculateScore} from '../game/calculate-score';

class ResultsScreen {
	constructor(model) {
		this.model = model;
		this.score = calculateScore(this.model.state.answers, this.model.state.lives);

		this.header = new HeaderView(this.model.state);
		this.header.onClick = this.goBack.bind(this);
		this.stats = new StatsView(this.model.state.answers);
		this.content = new ResultsView(this.model.state, this.score, this.stats);

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
}

export default ResultsScreen;
