import {getElementFromTemplate, changeScreen} from '../utils';
import {levels} from '../data/game-data';
import getHeader from '../templates/header';
import getResultScreen from './result';
import getStatsTemplate from '../templates/stats';
import {AnswerType} from '../data/calculate-score';

const getGameScreen = (state) => {
	const KeyCode = {
		SPACE: 32,
		ENTER: 13
	};

	const GameType = {
		ONE: 1,
		TWO: 2,
		THREE: 3
	};

	const gameTitles = {
		[GameType.ONE]: `Угадай, фото или рисунок?`,
		[GameType.TWO]: `Угадайте для каждого изображения фото или рисунок?`,
		[GameType.THREE]: `Найдите рисунок среди изображений`
	};

	const gameForms = {
		[GameType.ONE]: `
			<form class="game__content game__content--wide">
				<div class="game__option">
					<img src="${levels[state.level].images[0]}" alt="Option 1" width="705" height="455">
					<label class="game__answer  game__answer--photo">
						<input class="visually-hidden" name="question1" type="radio" value="photo">
						<span>Фото</span>
					</label>
					<label class="game__answer game__answer--paint">
						<input class="visually-hidden" name="question1" type="radio" value="paint">
						<span>Рисунок</span>
					</label>
				</div>
			</form>
		`,
		[GameType.TWO]: `
			<form class="game__content">
				<div class="game__option">
					<img src="${levels[state.level].images[0]}" alt="Option 1" width="468" height="458">
					<label class="game__answer game__answer--photo">
						<input class="visually-hidden" name="question1" type="radio" value="photo">
						<span>Фото</span>
					</label>
					<label class="game__answer game__answer--paint">
						<input class="visually-hidden" name="question1" type="radio" value="paint">
						<span>Рисунок</span>
					</label>
				</div>
				<div class="game__option">
					<img src="${levels[state.level].images[1]}" alt="Option 2" width="468" height="458">
					<label class="game__answer game__answer--photo">
						<input class="visually-hidden" name="question2" type="radio" value="photo">
						<span>Фото</span>
					</label>
					<label class="game__answer game__answer--paint">
						<input class="visually-hidden" name="question2" type="radio" value="paint">
						<span>Рисунок</span>
					</label>
				</div>
			</form>
		`,
		[GameType.THREE]: `
			<form class="game__content game__content--triple">
				<div class="game__option" tabindex="0">
					<img src="${levels[state.level].images[0]}" alt="Option 1" width="304" height="455">
				</div>
				<div class="game__option game__option--selected" tabindex="0">
					<img src="${levels[state.level].images[1]}" alt="Option 2" width="304" height="455">
				</div>
				<div class="game__option" tabindex="0">
					<img src="${levels[state.level].images[2]}" alt="Option 3" width="304" height="455">
				</div>
			</form>
		`
	};

	const gameType = levels[state.level].images.length;

	const gameTemplate = `
		<section class="game">
			<p class="game__task">${gameTitles[gameType]}</p>
			${gameForms[gameType]}
			${getStatsTemplate(state.answers)}
		</section>
	`;

	const gameElement = getElementFromTemplate(gameTemplate);
	gameElement.prepend(getHeader(state));

	const checkAnswers = (userAnswer) => {
		if (JSON.stringify(userAnswer) === JSON.stringify(levels[state.level].answers)) {
			return AnswerType.CORRECT;
		}

		return AnswerType.WRONG;
	};

	const getNextLevel = (levelResult) => {
		const stateChanges = {
			lives: (levelResult !== AnswerType.WRONG) ? state.lives : state.lives - 1,
			level: state.level + 1,
			answers: [...state.answers, {status: levelResult, timeElapsed: 15}] // TODO: timeElapsed
		};

		if (stateChanges.level >= levels.length || stateChanges.lives < 0) {
			changeScreen(getResultScreen(Object.assign({}, state, stateChanges)));

			return;
		}

		changeScreen(getGameScreen(Object.assign({}, state, stateChanges)));
	};

	if (gameType === 1) {
		const radioButtons = gameElement.querySelectorAll(`.game__answer input[type='radio']`);

		radioButtons.forEach((it) => {
			it.addEventListener(`change`, (evt) => getNextLevel(checkAnswers([evt.target.value])));
		});
	} else if (gameType === 2) {
		const form = gameElement.querySelector(`.game__content`);
		const radioButtons = gameElement.querySelectorAll(`.game__answer input[type='radio']`);
		const optionsNubmer = gameElement.querySelectorAll(`.game__option`).length;

		const formChangeHadler = () => {
			const inputValues = [];
			const checkedInputs = Array.from(radioButtons).filter((it) => {
				if (it.checked) {
					inputValues.push(it.value);
				}

				return it.checked;
			});

			if (checkedInputs.length >= optionsNubmer) {
				getNextLevel(checkAnswers(inputValues));
			}
		};

		form.addEventListener(`change`, formChangeHadler);
	} else if (gameType === 3) {
		const answers = gameElement.querySelectorAll(`.game__option`);

		answers.forEach((it) => {
			it.addEventListener(`click`, (evt) => getNextLevel(checkAnswers([evt.target.alt])));

			it.addEventListener(`keydown`, (evt) => {
				if (evt.keyCode === KeyCode.SPACE || evt.keyCode === KeyCode.ENTER) {
					getNextLevel(checkAnswers([evt.target.children[0].alt]));
				}
			});
		});
	}

	return gameElement;
};

export default getGameScreen;
