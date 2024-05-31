/**
 * An object with 2D positions and dimensions
 */
class Object2D {
    /**
     * @constructor
     * @param {Number} x - X position of the object
     * @param {Number} y - Y position of the object
     * @param {Number} width - Width of the object
     * @param {Number} height - Height of the object
     * @param {*} collisionLayerNums 
     */
    constructor(x, y, width, height, collisionLayerNums) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collisionLayerNums = collisionLayerNums;
        for (let i = 0; i < this.collisionLayerNums.length; i++) {
            collisionLayers[this.collisionLayerNums[i]].push(this);
        }

        this.gameCanvas = new GameCanvas(this.x, this.y, this.width, this.height);
        this.canvas = this.gameCanvas.canvas;
        this.ctx = this.gameCanvas.ctx;
    }

    /**
     * Returns whether a collision occured between two objects
     * @param {Object2D} object2D - The object the collision should be tested against
     * @returns {Boolean} The occurence of the collision
     */
    collide(object2D) {
        let xCollision = object2D.x < this.x + this.width && object2D.x + object2D.width > this.x;
        let yCollision = object2D.y < this.y + this.height && object2D.y + object2D.height > this.y;
    
        return xCollision && yCollision;
    }

    /**
     * Checks if the object is being hovered by the mouse 
     * @returns If the object is being hovered by the mouse
     */
    isMouseOver() {
        xOver = input.mousePos.x > this.x && input.mousePos.x < this.x + this.width;
        yOver = input.mousePos.y > this.y && input.mousePos.y < this.y + this.height;
        return xOver && yOver;
    }
    
    /**
     * Should be runs every frame, the updating of the properties of the object should be done here
     * @param {Number} dt - Time elapsed since the last frame in seconds
     */
    update(dt) {}

    /**
     * Should runs every frame, the rendering of the object should be done heres
     */
    render() {}

    /**
     * Rendering done for testing purposes when debug mode is active
     */
    renderDebug() {
        this.gameCanvas.clear();

        this.ctx.strokeStyle = "#F00";
        this.ctx.strokeRect(0, 0, this.width, this.height);
    }
}