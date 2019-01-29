const pictures = {
	paintings: [
		// People
		`https://k42.kn3.net/CF42609C8.jpg`,

		// Animals
		`https://k42.kn3.net/D2F0370D6.jpg`,

		// Nature
		`https://k32.kn3.net/5C7060EC5.jpg`,
	],
	photos: [
		// People
		`http://i.imgur.com/1KegWPz.jpg`,

		// Animals
		`https://i.imgur.com/DiHM5Zb.jpg`,

		// Nature
		`http://i.imgur.com/DKR1HtB.jpg`
	]
};

const initialState = Object.freeze({
	time: 30,
	lives: 3,
	level: 0,
	answers: []
});

const levels = [
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

export {initialState, levels};
