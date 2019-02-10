import AbstractView from './abstract-view';
import {ALL_ANSWERS_AMOUNT} from '../game/config';

class StatsView extends AbstractView {
	constructor(answers) {
		super();
		this.answers = answers;
	}

	get template() {
		return `
			<ul class="stats">
				${this.answers.map((it) => `<li class="stats__result stats__result--${it.status}"></li>`).join(``)}
				${new Array(ALL_ANSWERS_AMOUNT - this.answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
			</ul>
		`;
	}
}

export default StatsView;
