/**
 * An object for handling debugging
 */
class Debug {
    /**
     * @constructor
     * @param {Object[]} debugRenderList - Objects to run rednerDebug for 
     */
    constructor(debugRenderList = []) {
        this.dtSampleSize = 60;
        this.dtSamples = [];
        this.debugRenderList = debugRenderList;

        this.gameCanvas = new GameCanvas(0, 0, 0, 0);
    }

    /**
     * Updates the value of delta time in the debug UI
     * @returns {String} Delta time in milliseconds
     */
    updateDt() {
        let sum = 0;
        this.dtSamples.push(dt);
        if (this.dtSamples.length > this.dtSampleSize) this.dtSamples.splice(0, 1);
        for (let i = 0; i < this.dtSamples.length; i++) {
            sum += this.dtSamples[i];
        }
        return `${Math.round(sum / this.dtSamples.length * 10000) / 10}ms`;
    }

    /**
     * Renders the debug UI and runs the renderDebug() method of the objects in debugRenderList
     */
    render() {
        this.renderDebugObjects();
        this.renderUI();
    }

    /**
     * Runs the renderDebug() method of the objects in debugRenderList
     */
    renderDebugObjects() {
        for (let i = 0; i < this.debugRenderList.length; i++) {
            let debugObject = this.debugRenderList[i]
            debugObject.renderDebug();
            debugObject.gameCanvas.toCtx(this.ctx);
        }
    }

    /**
     * Renders the debug UI
     */
    renderUI() {
        ctx.fillStyle = "#000";
        //ctx.strokeStyle = "#FFF";
        //ctx.lineWidth = 5;
        const fontSize = 20;
        ctx.font = fontSize + "px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        ctx.fillText(`dt: ${this.updateDt()}`, 5, 5);
        ctx.fillText(`mousePos: ${JSON.stringify(input.mousePos)}`, 5, 5 + fontSize);
        ctx.fillText(`keysPressed: ${JSON.stringify(input.keysPressed)}`, 5, 5 + fontSize * 2);
        //if (camera != undefined) ctx.fillText(`cameraPos: (${camera.x}, ${camera.y})`, 5, 5 + fontSize * 3);
    }
}