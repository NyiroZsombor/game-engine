function wait(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {

    }
}

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
        script.onload = () => {
            console.log(`load ${src}`);
            resolve();
        }
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.body.appendChild(script);
    });
}

/**
 * Load the loaders of the modules
 */
async function loadLoaders() {
    await appendScript("default/loader.js");
    // Promise.all([appendScript("All other modules"), ...]);
    await appendScript("object-2ds/loader.js");
    await appendScript("main/loader.js");
}

loadLoaders();

wait(2000);