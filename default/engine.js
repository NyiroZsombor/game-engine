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
}

/**
 * Default updates run by the engine after rendering
 */
function defaultPostUpdate() {
    input.update();
}

function update() {}
function render() {}
function postUpdate() {}

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