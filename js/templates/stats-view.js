import AbstractView from './abstract-view';

class StatsView extends AbstractView {
	constructor(answers) {
		super();
		this.answers = answers;
	}

	get template() {
		return `
			<ul class="stats">
				${this.answers.map((it) => `<li class="stats__result stats__result--${it.status}"></li>`).join(``)}
				${new Array(10 - this.answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
			</ul>
		`;
	}
}
// FIXME: 10 - to const?

export default StatsView;
