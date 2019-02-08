import AbstractView from './abstract-view';
import {ExtraPoint} from '../data/config';
import {calculateScore} from '../game/calculate-score';
import StatsView from './stats-view';

class ResultsView extends AbstractView {
	get template() {
		return `
			<section class="result">
				<p>Результаты загружаются...</p>
			</section>
		`;
	}

	addResultPointsTemplate(score) {
		if (score === -1) {
			return `
				<td class="result__total"></td>
				<td class="result__total  result__total--final">fail</td>
			`.trim();
		}

		return `
			<td class="result__points">${score !== -1 ? `× ${ExtraPoint.BASE}` : ``}</td>
			<td class="result__total">${score.correct * ExtraPoint.BASE}</td>
		`.trim();
	}

	addFastPointsTemplate(score) {
		if (score === -1 || !score.fast) {
			return ``;
		}

		return `
			<tr>
				<td></td>
				<td class="result__extra">Бонус за скорость:</td>
				<td class="result__extra">${score.fast} <span class="stats__result stats__result--fast"></span></td>
				<td class="result__points">× ${ExtraPoint.FAST}</td>
				<td class="result__total">${score.fast * ExtraPoint.FAST}</td>
			</tr>
		`.trim();
	}

	addLivePointsTemplate(score, lives) {
		if (score === -1 || score.lives < 1) {
			return ``;
		}

		return `
			<tr>
				<td></td>
				<td class="result__extra">Бонус за жизни:</td>
				<td class="result__extra">${lives} <span class="stats__result stats__result--alive"></span></td>
				<td class="result__points">× ${ExtraPoint.LIFE}</td>
				<td class="result__total">${lives * ExtraPoint.LIFE}</td>
			</tr>
		`.trim();
	}

	addSlowPointsTemplate(score) {
		if (score === -1 || !score.slow) {
			return ``;
		}

		return `
			<tr>
				<td></td>
				<td class="result__extra">Штраф за медлительность:</td>
				<td class="result__extra">${score.slow} <span class="stats__result stats__result--slow"></span></td>
				<td class="result__points">× ${ExtraPoint.SLOW}</td>
				<td class="result__total">-${score.slow * ExtraPoint.SLOW}</td>
			</tr>
		`.trim();
	}

	addFinalScoreTemplate(score) {
		if (score === -1) {
			return ``;
		}

		return `
			<tr>
				<td colspan="5" class="result__total result__total--final">${score.finalScore}</td>
			</tr>
		`.trim();
	}

	isWin(result) {
		return result.score !== -1;
	}

	getResultsTemplate(results, scores) {
		const reusltTables = results.map((result, i) => {
			return `
				<table class="result__table">
					<tr>
						<td class="result__number">${i + 1}.</td>
						<td colspan="2">
							${new StatsView(result.answers).template}
						</td>
						${this.addResultPointsTemplate(scores[i])}
					</tr>
					${this.addFastPointsTemplate(scores[i])}
					${this.addLivePointsTemplate(scores[i], result.lives)}
					${this.addSlowPointsTemplate(scores[i])}
					${this.addFinalScoreTemplate(scores[i])}
				</table>
			`;
		});

		return `
			<h2 class="result__title">${this.isWin(scores[0]) ? `Победа!` : `Поражение`}</h2>
			${reusltTables.join(``)}
		`;
	}

	showScores(results) {
		results = results.reverse();
		const scores = results.map((it) => calculateScore(it.answers, it.lives));
		const resultsTemplate = this.getResultsTemplate(results, scores);
		this.element.innerHTML = resultsTemplate;
	}
}

export default ResultsView;
