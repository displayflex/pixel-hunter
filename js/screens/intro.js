import IntroView from '../templates/intro-view';
import {changeView} from '../utils';
import showGreeting from './greeting';

const intro = new IntroView();

intro.onClick = () => {
	changeView(showGreeting());
};

export default () => intro;
