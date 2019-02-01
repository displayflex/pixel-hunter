import RulesView from '../templates/rules-view';
import {changeView} from '../utils';
import HeaderView from '../templates/header-view';
import showGreeting from './greeting';
import startGame from './game';

const header = new HeaderView();
const rules = new RulesView(header);

rules.onSubmit = () => {
	changeView(startGame());
};

header.onClick = () => {
	changeView(showGreeting());
};

export default () => rules;
