/**
 * Appends a scipt element to the DOM
 * @param {String} src - The URL of the script
 * @returns {Promise}
 */
async function appendScript(src) {
    return new Promise((resolve, reject) => {
        if (!src) {
            console.error("src cannot be undefined");
            return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.body.appendChild(script);
    });
}

/**
 * Loads the necessary scipts for the engine
 */
async function loadDefault() {
    await Promise.all([
        appendScript("default/game-canvas.js"),
        appendScript("default/action.js"),
        appendScript("default/debug.js"),
        appendScript("default/input.js"),
    ]);
    await appendScript("default/engine.js");
    await appendScript("main.js");
}

loadDefault();