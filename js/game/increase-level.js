const increaseLevel = (state) => {
	if (typeof state.level !== `number`) {
		throw new Error(`Level should be a number`);
	}

	if (state.level < 0) {
		throw new RangeError(`Level shouldn't be a negative number`);
	}

	const newState = Object.assign({}, state);

	newState.level++;

	return newState;
};

export default increaseLevel;
