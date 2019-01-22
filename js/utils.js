const mainElement = document.querySelector(`#main`);

const getElementFromTemplate = (markup) => {
	const element = document.createElement(`div`);
	element.innerHTML = markup.trim();

	return element;
};

const changeScreen = (element) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(element);
};

export {getElementFromTemplate, changeScreen};
