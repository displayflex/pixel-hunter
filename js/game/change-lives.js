const changeLives = (state) => {
	if (typeof state.lives !== `number`) {
		throw new Error(`Lives should be a number`);
	}

	if (state.lives <= 0) {
		throw new RangeError(`Lives should be a positive number`);
	}

	const newState = Object.assign({}, state);

	newState.lives--;

	return newState;
};

export default changeLives;
