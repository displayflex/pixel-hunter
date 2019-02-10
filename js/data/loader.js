import adaptServerData from '../game/data-adapter';

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
	} else {
		throw new Error(`${response.status}: ${response.statusText}`);
	}
};

const toJSON = (response) => response.json();

class Loader {
	static async loadData() {
		const response = await fetch(`${SERVER_URL}/questions`);
		checkStatus(response);
		const data = await toJSON(response);

		return adaptServerData(data);
	}

	static async loadResults(name = DEFAULT_NAME) {
		const response = await fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`);
		checkStatus(response);

		return await toJSON(response);
	}

	static async saveResults(data, name = DEFAULT_NAME) {
		data = Object.assign({name}, data);

		const requestSettings = {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': `application/json`
			},
			method: `POST`
		};

		const response = await fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`, requestSettings);
		checkStatus(response);
	}
}

export default Loader;
