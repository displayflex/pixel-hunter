import GreetingView from '../templates/greeting-view';
import {changeView} from '../utils';
import showRules from './rules';

const greeting = new GreetingView();

greeting.onClick = () => {
	changeView(showRules());
};

export default () => greeting;
