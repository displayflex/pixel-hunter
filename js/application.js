import IntroScreen from "./screens/intro-screen";
import GreetingScreen from "./screens/greeting-screen";
import RulesScreen from "./screens/rules-screen";
import GameModel from "./models/game-model";
import GameScreen from "./screens/game-screen";
import ResultsScreen from "./screens/results-screen";
import ErrorView from "./views/modals/error-view";
import Loader from "./data/loader";

const mainElement = document.querySelector(`#main`);

const changeView = (element, isFade = false) => {
	if (!isFade) {
		mainElement.innerHTML = ``;
	}

	mainElement.appendChild(element);
};

let gameData;

class Application {
	static async showIntro() {
		const intro = new IntroScreen();
		changeView(intro.element);

		try {
			gameData = await Loader.loadData();
			intro.enableButton();
		} catch (err) {
			Application.showError(err);
		}
	}

	static showGreeting(isFade) {
		const greeting = new GreetingScreen();
		changeView(greeting.element, isFade);
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

	static async showResults(model) {
		const playerName = model.playerName;
		const resultsData = {
			answers: model.state.answers,
			lives: model.state.lives
		};
		const results = new ResultsScreen(model);
		changeView(results.element);

		try {
			await Loader.saveResults(resultsData, playerName);
			results.showScores(await Loader.loadResults(playerName));
		} catch (err) {
			Application.showError(err);
		}
	}

	static showError() {
		const error = new ErrorView();
		document.body.appendChild(error.element);
	}
}

export default Application;
