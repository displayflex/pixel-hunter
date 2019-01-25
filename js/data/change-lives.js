const initialGame = {
	level: 0,
	lives: 3,
	time: 0
};

const changeLives = (game, livesAmount) => {
	if (livesAmount < 0) {
		throw new RangeError(`Can't set negative lives`);
	}

	if (typeof livesAmount !== `number`) {
		throw new Error(`Lives should be a number`);
	}

	const newGame = Object.assign({}, game);

	newGame.lives = livesAmount;

	return newGame;
};

export {changeLives, initialGame};
