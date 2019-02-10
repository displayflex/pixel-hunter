const hash = window.location.hash.replace(`#`, ``);

const DEBUG = hash.toLowerCase() === `debug`;
const DEBUG_STYLE = `style="border: 5px solid green"`;

export {DEBUG, DEBUG_STYLE};
