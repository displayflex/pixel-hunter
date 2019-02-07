const pictures = { // TODO: remove this
	paintings: [
		// People
		{
			src: `https://k42.kn3.net/CF42609C8.jpg`,
			width: 600,
			height: 831
		},

		// Animals
		{
			src: `https://k42.kn3.net/D2F0370D6.jpg`,
			width: 468,
			height: 354
		},

		// Nature
		{
			src: `https://k32.kn3.net/5C7060EC5.jpg`,
			width: 1184,
			height: 888
		},
	],
	photos: [
		// People
		{
			src: `http://i.imgur.com/1KegWPz.jpg`,
			width: 1080,
			height: 720
		},

		// Animals
		{
			src: `https://i.imgur.com/DiHM5Zb.jpg`,
			width: 636,
			height: 938
		},

		// Nature
		{
			src: `http://i.imgur.com/DKR1HtB.jpg`,
			width: 354,
			height: 937
		},
	]
};

const INITIAL_STATE = Object.freeze({
	time: 30,
	lives: 3,
	level: 0,
	answers: []
});

const LEVELS = [ // TODO: remove this
	{
		images: [pictures.paintings[0], pictures.photos[0], pictures.photos[2]],
		answers: [`Option 1`]
	},
	{
		images: [pictures.paintings[1], pictures.photos[1]],
		answers: [`paint`, `photo`]
	},
	{
		images: [pictures.paintings[2]],
		answers: [`paint`]
	},
	{
		images: [pictures.photos[0], pictures.paintings[2], pictures.photos[2]],
		answers: [`Option 2`]
	},
	{
		images: [pictures.photos[2]],
		answers: [`photo`]
	},
	{
		images: [pictures.paintings[2], pictures.photos[2]],
		answers: [`paint`, `photo`]
	},
	{
		images: [pictures.photos[0], pictures.paintings[0]],
		answers: [`photo`, `paint`]
	},
	{
		images: [pictures.photos[1], pictures.paintings[1], pictures.photos[0]],
		answers: [`Option 2`]
	},
	{
		images: [pictures.paintings[0], pictures.photos[2]],
		answers: [`paint`, `photo`]
	},
	{
		images: [pictures.photos[0], pictures.photos[1], pictures.paintings[2]],
		answers: [`Option 3`]
	}
];

export {INITIAL_STATE, LEVELS};
