const mainElement = document.querySelector(`#main`);

const getElementFromTemplate = (markup) => {
	const wrapper = document.createElement(`div`); // TODO: переделать под DocumentFragment?
	wrapper.innerHTML = markup.trim();

	return wrapper;
};

const changeView = (view) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(view.element);
};

export {getElementFromTemplate, changeView};
