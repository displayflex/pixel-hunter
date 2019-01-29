import {getElementFromTemplate, changeScreen} from '../utils';
import getGreetingScreen from '../pages/greeting';

const MAX_LIVES = 3;

const backButtonTemplate = `
	<button class="back">
		<span class="visually-hidden">Вернуться к началу</span>
		<svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
			<use xlink:href="img/sprite.svg#arrow-left"></use>
		</svg>
		<svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
			<use xlink:href="img/sprite.svg#logo-small"></use>
		</svg>
	</button>
`;

const getHeaderTemplateFull = (state) => (`
	<header class="header">
		${backButtonTemplate}
		<div class="game__timer">${state.time}</div>
		<div class="game__lives">
			${new Array(MAX_LIVES - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
			${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
		</div>
	</header>
`);

const getHeaderTemplateShort = () => (`
	<header class="header">
		${backButtonTemplate}
	</header>
`);

const getHeader = (state) => {
	const headerTemplate = state ? getHeaderTemplateFull(state) : getHeaderTemplateShort();
	const headerElement = getElementFromTemplate(headerTemplate);

	const backButton = headerElement.querySelector(`.back`);

	backButton.addEventListener(`click`, () => changeScreen(getGreetingScreen()));

	return headerElement;
};

export default getHeader;
