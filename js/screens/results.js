import ResultsView from '../templates/results-view';
import HeaderView from '../templates/header-view';
import {changeView} from '../utils';
import showGreeting from './greeting';
import {calculateScore} from '../game/calculate-score';
import StatsView from '../templates/stats-view';

const showResults = (state) => {
	const score = calculateScore(state.answers, state.lives);

	const header = new HeaderView();
	const stats = new StatsView(state.answers);
	const results = new ResultsView(state, score, header, stats);

	header.onClick = () => {
		changeView(showGreeting());
	};

	return results;
};

export default showResults;
