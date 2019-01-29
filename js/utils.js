const mainElement = document.querySelector(`#main`);

const getElementFromTemplate = (markup) => {
	const element = document.createElement(`div`);
	element.innerHTML = markup.trim();

	return element;
};
// TODO: переделать под DocumentFragment?

const changeScreen = (element) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(element);

	// elements.forEach((it) => {
	// 	mainElement.appendChild(it); // TODO: переделать что бы не перерисовывался header
	// });
};

export {getElementFromTemplate, changeScreen};
