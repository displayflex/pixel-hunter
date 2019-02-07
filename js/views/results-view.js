import AbstractView from './abstract-view';
import {ExtraPoint} from '../data/config';

class ResultsView extends AbstractView {
	constructor(state, score, stats) {
		super();
		this.state = state;
		this.score = score;
		this.statsTemplate = stats.template;
	}

	get template() {
		return `
			<section class="result">
				<h2 class="result__title">${this.title}!</h2>
				<table class="result__table">
					<tr>
						<td class="result__number">1.</td>
						<td colspan="2">
							${this.statsTemplate}
						</td>
						${this.addResultPointsTemplate()}
					</tr>
					${this.addFastPointsTemplate()}
					${this.addLivePointsTemplate()}
					${this.addSlowPointsTemplate()}
					${this.addFinalScoreTemplate()}
				</table>
				<table class="result__table">
					<tr>
						<td class="result__number">2.</td>
						<td>
							<ul class="stats">
								<li class="stats__result stats__result--wrong"></li>
								<li class="stats__result stats__result--slow"></li>
								<li class="stats__result stats__result--fast"></li>
								<li class="stats__result stats__result--correct"></li>
								<li class="stats__result stats__result--wrong"></li>
								<li class="stats__result stats__result--unknown"></li>
								<li class="stats__result stats__result--slow"></li>
								<li class="stats__result stats__result--wrong"></li>
								<li class="stats__result stats__result--fast"></li>
								<li class="stats__result stats__result--wrong"></li>
							</ul>
						</td>
						<td class="result__total"></td>
						<td class="result__total  result__total--final">fail</td>
					</tr>
				</table>
				<table class="result__table">
					<tr>
						<td class="result__number">3.</td>
						<td colspan="2">
							<ul class="stats">
								<li class="stats__result stats__result--wrong"></li>
								<li class="stats__result stats__result--slow"></li>
								<li class="stats__result stats__result--fast"></li>
								<li class="stats__result stats__result--correct"></li>
								<li class="stats__result stats__result--wrong"></li>
								<li class="stats__result stats__result--unknown"></li>
								<li class="stats__result stats__result--slow"></li>
								<li class="stats__result stats__result--unknown"></li>
								<li class="stats__result stats__result--fast"></li>
								<li class="stats__result stats__result--unknown"></li>
							</ul>
						</td>
						<td class="result__points">× 100</td>
						<td class="result__total">900</td>
					</tr>
					<tr>
						<td></td>
						<td class="result__extra">Бонус за жизни:</td>
						<td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
						<td class="result__points">× 50</td>
						<td class="result__total">100</td>
					</tr>
					<tr>
						<td colspan="5" class="result__total  result__total--final">950</td>
					</tr>
				</table>
			</section>
		`;
	}

	get title() {
		this._title = (this.score === -1) ? `Поражение` : `Победа`;

		return this._title;
	}

	addResultPointsTemplate() {
		if (this.score === -1) {
			return `
				<td class="result__total"></td>
				<td class="result__total  result__total--final">fail</td>
			`.trim();
		}

		return `
			<td class="result__points">${this.score !== -1 ? `× ${ExtraPoint.BASE}` : ``}</td>
			<td class="result__total">${this.score.correct * ExtraPoint.BASE}</td>
		`.trim();
	}

	addFastPointsTemplate() {
		if (this.score === -1 || !this.score.fast) {
			return ``;
		}

		return `
			<tr>
				<td></td>
				<td class="result__extra">Бонус за скорость:</td>
				<td class="result__extra">${this.score.fast} <span class="stats__result stats__result--fast"></span></td>
				<td class="result__points">× ${ExtraPoint.FAST}</td>
				<td class="result__total">${this.score.fast * ExtraPoint.FAST}</td>
			</tr>
		`.trim();
	}

	addLivePointsTemplate() {
		if (this.score === -1 || this.score.lives < 1) {
			return ``;
		}

		return `
			<tr>
				<td></td>
				<td class="result__extra">Бонус за жизни:</td>
				<td class="result__extra">${this.state.lives} <span class="stats__result stats__result--alive"></span></td>
				<td class="result__points">× ${ExtraPoint.LIFE}</td>
				<td class="result__total">${this.state.lives * ExtraPoint.LIFE}</td>
			</tr>
		`.trim();
	}

	addSlowPointsTemplate() {
		if (this.score === -1 || !this.score.slow) {
			return ``;
		}

		return `
			<tr>
				<td></td>
				<td class="result__extra">Штраф за медлительность:</td>
				<td class="result__extra">${this.score.slow} <span class="stats__result stats__result--slow"></span></td>
				<td class="result__points">× ${ExtraPoint.SLOW}</td>
				<td class="result__total">-${this.score.slow * ExtraPoint.SLOW}</td>
			</tr>
		`.trim();
	}

	addFinalScoreTemplate() {
		if (this.score === -1) {
			return ``;
		}

		return `
			<tr>
				<td colspan="5" class="result__total result__total--final">${this.score.finalScore}</td>
			</tr>
		`.trim();
	}
}

export default ResultsView;
