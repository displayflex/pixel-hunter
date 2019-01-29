const getStatsTemplate = (answers) => `
	<ul class="stats">
		${answers.map((it) => `<li class="stats__result stats__result--${it.status}"></li>`).join(``)}
		${new Array(10 - answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
	</ul>
`;
// FIXME: 10 - to const?
export default getStatsTemplate;
