import adaptServerData from './data-adapter';

const Status = {
	OK: 200,
	REDIRECT: 300
};

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAULT_NAME = `John Doe`;
const APP_ID = 22331138;

const checkStatus = (response) => {
	if (response.status >= Status.OK && response.status < Status.REDIRECT) {
		return response;
	}

	throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => response.json();

class Loader {
	static loadData() {
		return fetch(`${SERVER_URL}/questions`)
			.then(checkStatus)
			.then(toJSON)
			.then(adaptServerData);
	}

	static loadResults(name = DEFAULT_NAME) {
		return fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`)
			.then(checkStatus)
			.then(toJSON);
	}

	static saveResults(data, name = DEFAULT_NAME) {
		data = Object.assign({name}, data);

		const requestSettings = {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': `application/json`
			},
			method: `POST`
		};

		return fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`, requestSettings)
			.then(checkStatus);
	}
}

export default Loader;
