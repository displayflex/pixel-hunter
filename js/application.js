import IntroScreen from "./screens/intro-screen";
import GreetingScreen from "./screens/greeting-screen";
import RulesScreen from "./screens/rules-screen";
import GameModel from "./models/game-model";
import GameScreen from "./screens/game-screen";
import ResultsScreen from "./screens/results-screen";
import adaptServerData from './game/data-adapter';
import ErrorView from "./views/modal-error-view";
import {Status, DataURL} from './data/config';

const mainElement = document.querySelector(`#main`);

const changeView = (element) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(element);
};

const checkStatus = (response) => {
	if (response.status >= Status.OK && response.status < Status.REDIRECT) {
		return response;
	} else {
		throw new Error(`${response.status}: ${response.statusText}`);
	}
};

let gameData;

class Application {
	static showIntro() {
		const intro = new IntroScreen();
		changeView(intro.element);

		window.fetch(DataURL.LOAD)
			.then(checkStatus)
			.then((response) => response.json())
			.then((data) => {
				gameData = adaptServerData(data)
			})
			.then(Application.showGreeting())
			.catch((err) => Application.showError(err));
	}

	static showGreeting() {
		const greeting = new GreetingScreen();
		changeView(greeting.element);
	}

	static showRules() {
		const rules = new RulesScreen();
		changeView(rules.element);
	}

	static showGame(playerName) {
		const model = new GameModel(gameData, playerName);
		const gameScreen = new GameScreen(model);
		changeView(gameScreen.element);
		gameScreen.startGame();
	}

	static showResults(model) {
		const results = new ResultsScreen(model);
		changeView(results.element);
	}

	static showError() {
		const error = new ErrorView();
		document.body.appendChild(error.element);
	}
}

export default Application;
