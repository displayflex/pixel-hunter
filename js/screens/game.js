import {levels, initialState} from '../data/game-data';
import {changeView} from '../utils';
import HeaderView from '../templates/header-view';
import showGreeting from './greeting';
import GameSingleView from '../templates/game-single-view';
import GameDoubleView from '../templates/game-double-view';
import GameTripleView from '../templates/game-triple-view';
import {AnswerType} from '../data/config';
import StatsView from '../templates/stats-view';
import showResults from './results';
import changeLives from '../game/change-lives';
import increaseLevel from '../game/increase-level';

const changeLevel = (state) => {
	const ImagesToChoose = {
		ONE: 1,
		TWO: 2,
		THREE: 3
	};

	const MAX_GAME_LEVEL = levels.length - 1;
	const levelData = levels[state.level];

	const header = new HeaderView(state);
	const stats = new StatsView(state.answers);
	let level;

	switch (levelData.images.length) {
		case ImagesToChoose.ONE:
			level = new GameSingleView(state, levelData, header, stats);
			break;

		case ImagesToChoose.TWO:
			level = new GameDoubleView(state, levelData, header, stats);
			break;

		case ImagesToChoose.THREE:
			level = new GameTripleView(state, levelData, header, stats);
			break;

		default:
			throw new Error(`Invalid type of game`);
	}

	header.onClick = () => {
		changeView(showGreeting());
	};

	const isRightAnswer = (userAnswer, levelAnswer) => {
		return JSON.stringify(userAnswer) === JSON.stringify(levelAnswer);
	};

	level.onAnswer = (answer) => {
		let newState = Object.assign({}, state);

		if (!isRightAnswer(answer, levelData.answers)) {
			newState = changeLives(newState);
			newState.answers.push({status: AnswerType.WRONG, timeElapsed: 15});
		} else {
			newState.answers.push({status: AnswerType.CORRECT, timeElapsed: 15});
		}

		newState = increaseLevel(newState);

		if (newState.level > MAX_GAME_LEVEL || newState.lives <= 0) {
			changeView(showResults(newState));

			return;
		}

		changeView(changeLevel(newState));
	};

	return level;
};

export default () => changeLevel(Object.assign({}, initialState));
