import {getElementFromTemplate} from '../utils';
import getHeader from '../templates/header';
import getStatsTemplate from '../templates/stats';
import {calculateScore, ExtraPoint} from '../data/calculate-score';

const getResultScreen = (state) => {
	const score = calculateScore(state.answers, state.lives);
	const title = (score === -1) ? `Поражение` : `Победа`;

	const resultTemplate = `
		<section class="result">
			<h2 class="result__title">${title}!</h2>
			<table class="result__table">
				<tr>
					<td class="result__number">1.</td>
					<td colspan="2">
						${getStatsTemplate(state.answers)}
					</td>
					<td class="result__points">× ${ExtraPoint.BASE}</td>
					<td class="result__total">${score.correct * ExtraPoint.BASE}</td>
				</tr>
				<tr>
					<td></td>
					<td class="result__extra">Бонус за скорость:</td>
					<td class="result__extra">${score.fast} <span class="stats__result stats__result--fast"></span></td>
					<td class="result__points">× ${ExtraPoint.FAST}</td>
					<td class="result__total">${score.fast * ExtraPoint.FAST}</td>
				</tr>
				<tr>
					<td></td>
					<td class="result__extra">Бонус за жизни:</td>
					<td class="result__extra">${state.lives} <span class="stats__result stats__result--alive"></span></td>
					<td class="result__points">× ${ExtraPoint.LIFE}</td>
					<td class="result__total">${state.lives * ExtraPoint.LIFE}</td>
				</tr>
				<tr>
					<td></td>
					<td class="result__extra">Штраф за медлительность:</td>
					<td class="result__extra">${score.slow} <span class="stats__result stats__result--slow"></span></td>
					<td class="result__points">× ${ExtraPoint.SLOW}</td>
					<td class="result__total">-${score.slow * ExtraPoint.SLOW}</td>
				</tr>
				<tr>
					<td colspan="5" class="result__total  result__total--final">${score.finalScore}</td>
				</tr>
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

	const resultElement = getElementFromTemplate(resultTemplate);
	resultElement.prepend(getHeader());

	return resultElement;
};

export default getResultScreen;
