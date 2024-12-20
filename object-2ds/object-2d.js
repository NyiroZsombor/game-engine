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
     * @param {* | undefined} objectList - A dictionary with ids as keys and Object2Ds as values. The list of objects that should be rendered and updated together
     * @param {Number[]} collisionLayerNums - The list of layers that specify which objects can collide with this object 
     */
    constructor(x, y, width, height, objectList = undefined, collisionLayerNums = []) {
        this.id = currentId;
        currentId++;
        
        this.collisionLayerNums = collisionLayerNums;
        for (let i = 0; i < this.collisionLayerNums.length; i++) {
            collisionLayers[this.collisionLayerNums[i]][this.id] = this;
        }

        this.gameCanvas = new GameCanvas(0, 0, 1, 1);
        this.canvas = this.gameCanvas.canvas;
        this.ctx = this.gameCanvas.ctx;

        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        if (objectList) {
            objectList[this.id] = this;
            this.objectList = objectList;
        }
    }

    /**
     * Returns whether a collision occured between two objects
     * @param {Object2D} object2D - The object the collision should be tested against
     * @returns {boolean} The occurence of the collision
     */
    collide(object2D) {
        let xCollision = object2D.x < this.right && object2D.right > this.x;
        let yCollision = object2D.y < this.bottom && object2D.bottom > this.y;
    
        return xCollision && yCollision;
    }

    /**
     * Checks if the object is being hovered by the mouse 
     * @returns {boolean} If the object is being hovered by the mouse
     */
    isMouseOver() {
        let xOver = input.mouse.pos.x > this.x && input.mouse.pos.x < this.right;
        let yOver = input.mouse.pos.y > this.y && input.mouse.pos.y < this.bottom;
        return xOver && yOver;
    }
    
    /**
     * Should be run every frame, the updating of the properties of the object should be done here
     * @param {Number} dt - Time elapsed since the last frame in seconds
     */
    update(dt) {}

    /**
     * Should run every frame, the rendering of the object should be done heres
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

    set x(x) {
        this.$x = x;
        this.$right = this.$x + this.width;
        this.$centerX = this.$x + this.width / 2;
    }

    set left(x) {
        this.x = x;
    }

    set right(x) {
        this.x = x - this.width;
    }

    set centerX(x) {
        this.x = x - this.width / 2;
    }

    get x() {
        return this.$x;
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.$right;
    }

    get centerX() {
        return this.$centerX;
    }

    set y(y) {
        this.$y = y;
        this.$bottom = this.$y + this.height;
        this.$centerY = this.$y + this.height / 2;
    }

    set top(y) {
        this.y = y;
    }

    set bottom(y) {
        this.y = y - this.height;
    }

    set centerY(y) {
        this.y = y - this.height / 2;
    }

    get y() {
        return this.$y;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.$bottom;
    }

    get centerY() {
        return this.$centerY;
    }

    set width(w) {
        this.$width = w;
        this.gameCanvas.width = w;
    }

    set height(h) {
        this.$height = h;
        this.gameCanvas.height = h;
    }

    get width() {
        return this.$width;
    }

    get height() {
        return this.$height;
    }
}