import {getElementFromTemplate, changeScreen} from '../utils';
import greetingElement from './greeting';

const introElement = getElementFromTemplate(`
	<section class="intro">
		<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
		<p class="intro__motto">
			<sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
		</p>
	</section>
`);

const nextButton = introElement.querySelector(`.intro__asterisk`);

nextButton.addEventListener(`click`, () => changeScreen(greetingElement));

export default introElement;
