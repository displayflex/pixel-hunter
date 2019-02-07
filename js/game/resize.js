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

export default resize;
