import IntroScreen from "./screens/intro-screen";
import GreetingScreen from "./screens/greeting-screen";
import RulesScreen from "./screens/rules-screen";
import GameModel from "./models/game-model";
import GameScreen from "./screens/game-screen";
import ResultsScreen from "./screens/results-screen";
import ErrorView from "./views/modal-error-view";
import Loader from "./data/loader";

const mainElement = document.querySelector(`#main`);

const changeView = (element) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(element);
};

let gameData;

class Application {
	static showIntro() {
		const intro = new IntroScreen();
		changeView(intro.element);

		Loader.loadData()
			.then((data) => {
				gameData = data;
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
		const playerName = model.playerName;
		const resultsData = {
			answers: model.state.answers,
			lives: model.state.lives
		};
		const results = new ResultsScreen(model);
		changeView(results.element);
		Loader.saveResults(resultsData, playerName)
			.then(() => Loader.loadResults(playerName))
			.then((data) => results.showScores(data))
			.catch((err) => Application.showError(err));
	}

	static showError() {
		const error = new ErrorView();
		document.body.appendChild(error.element);
	}
}

export default Application;
