import {ImagesToChoose, ImageFrame} from '../data/config';

const resize = (frame, image) => {
	const widthRatio = image.width / frame.width;
	const heightRatio = image.height / frame.height;

	if (widthRatio > heightRatio) {
		return {
			width: Math.floor(image.width / widthRatio),
			height: Math.floor(image.height / widthRatio)
		};
	} else {
		return {
			width: Math.floor(image.width / heightRatio),
			height: Math.floor(image.height / heightRatio)
		};
	}
};

const getResizedImages = (images) => {
	let frame;

	switch (images.length) {
		case ImagesToChoose.ONE:
			frame = ImageFrame.SINGLE;
			break;
		case ImagesToChoose.TWO:
			frame = ImageFrame.DOUBLE;
			break;
		case ImagesToChoose.THREE:
			frame = ImageFrame.TRIPLE;
			break;

		default:
			throw new Error(`Invalid type of game`);
	}

	const resizedImages = images.map((it) => {
		const resized = resize(frame, {width: it.width, height: it.height});

		return {
			src: it.src,
			width: resized.width,
			height: resized.height
		};
	});

	return resizedImages;
};

export {resize, getResizedImages};
