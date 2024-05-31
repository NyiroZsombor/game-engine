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
    await appendScript("default/done.js");
}

loadDefault();