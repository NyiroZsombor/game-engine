/**
 * Starts the game loop
 */
function loadEngine() {
    setInterval(gameLoop, 1000 / fps);
    console.log("engine loaded successfuly!");
}

/**
 * Main game loop
 */
function gameLoop() {
    defaultUpdate(dt);
    update(dt);
    renderDefault();
    render();
    renderUI();
    if (debug) debugObj.render();
    defaultPostUpdate(dt);
    postUpdate(dt);
}

/**
 * Default updates run by the engine
 */
function defaultUpdate() {
    dt = (Date.now() - pt) / 1000;
    pt = Date.now();
}

/**
 * Default rendering done by the engine
 */
function renderDefault() {
    gameCanvas.clear();
    camera.gameCanvas.clear();
}

/**
 * Renders UI objects
 */
function renderUI() {}

/**
 * Default updates run by the engine after rendering
 */
function defaultPostUpdate(dt) {
    input.update();
}

/**
 * Runs every frame, the updating of objects should be done here
 * @param {Number} dt - Time elapsed since last frame in seconds
 */
function update(dt) {}
/**
 * Runs every frame, the rendering of the objects should be done here
 */
function render() {}
/**
 * Runs every frame after the rendering
 * @param {Number} dt - Time elapsed since last frame in seconds
 */
function postUpdate(dt) {}

gameCanvas = new GameCanvas(0, 0, window.innerWidth, window.innerHeight);
gameCanvas.display = true;
const canvas = gameCanvas.canvas;
const ctx = gameCanvas.ctx;
let fps = 60;
let dt = 0;
let pt = Date.now();
let debug = false;
const debugObj = new Debug();
const input = new Input();

loadEngine();