import IntroScreen from "./screens/intro-screen";
import GreetingScreen from "./screens/greeting-screen";
import RulesScreen from "./screens/rules-screen";
import GameModel from "./models/game-model";
import GameScreen from "./screens/game-screen";
import ResultsScreen from "./screens/results-screen";

const mainElement = document.querySelector(`#main`);

const changeView = (element) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(element);
};

class Application {
	static showIntro() {
		const intro = new IntroScreen();
		changeView(intro.element);
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
		const model = new GameModel(playerName);
		const gameScreen = new GameScreen(model);
		changeView(gameScreen.element);
		gameScreen.startGame();
	}

	static showResults(model) {
		const results = new ResultsScreen(model);
		changeView(results.element);
	}
}

export default Application;
