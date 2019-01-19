'use strict';

(() => {
	const KeyCode = {
		ARROW_RIGHT: 39,
		ARROW_LEFT: 37
	};

	const mainElement = document.querySelector(`#main`);
	const screenIDs = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`];
	const screens = screenIDs.map((it) => document.querySelector(`#${it}`));

	const navigationMarkup = `
		<div class="arrows__wrap">
			<style>
				.arrows__wrap {
					position: absolute;
					top: 95px;
					left: 50%;
					margin-left: -56px;
				}
				.arrows__btn {
					background: none;
					border: 2px solid black;
					padding: 5px 20px;
				}
			</style>
			<button class="arrows__btn"><-</button>
			<button class="arrows__btn">-></button>
		</div>
	`;

	let currentScreen = 0;

	const renderScreen = (index) => {
		mainElement.innerHTML = ``;
		mainElement.appendChild(screens[index].content.cloneNode(true));
	};

	const showNextScreen = () => {
		if (currentScreen === screens.length - 1) {
			return;
		}

		currentScreen += 1;
		renderScreen(currentScreen);
	};

	const showPreviousScreen = () => {
		if (currentScreen === 0) {
			return;
		}

		currentScreen -= 1;
		renderScreen(currentScreen);
	};

	const renderArrows = () => {
		document.body.insertAdjacentHTML(`beforeend`, navigationMarkup);
	};

	renderScreen(currentScreen);
	renderArrows();

	const arrows = document.querySelectorAll(`.arrows__btn`);
	const leftArrow = arrows[0];
	const rightArrow = arrows[1];

	document.addEventListener(`keydown`, (evt) => {
		if (evt.keyCode === KeyCode.ARROW_RIGHT) {
			showNextScreen();
		}

		if (evt.keyCode === KeyCode.ARROW_LEFT) {
			showPreviousScreen();
		}
	});

	leftArrow.addEventListener(`click`, () => {
		showPreviousScreen();
	});

	rightArrow.addEventListener(`click`, () => {
		showNextScreen();
	});
})();
