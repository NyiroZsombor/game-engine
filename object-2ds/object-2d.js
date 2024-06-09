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
     * @param {Number[]} collisionLayerNums - The list of layers that specify which objects can collide with this object 
     */
    constructor(x, y, width, height, collisionLayerNums = []) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.collisionLayerNums = collisionLayerNums;
        for (let i = 0; i < this.collisionLayerNums.length; i++) {
            collisionLayers[this.collisionLayerNums[i]].push(this);
        }

        this.gameCanvas = new GameCanvas(0, 0, this.width, this.height);
        this.canvas = this.gameCanvas.canvas;
        this.ctx = this.gameCanvas.ctx;

        object2Ds[currentId] = this;
        this.id = currentId;
        currentId++;
    }

    /**
     * Returns whether a collision occured between two objects
     * @param {Object2D} object2D - The object the collision should be tested against
     * @returns {Boolean} The occurence of the collision
     */
    collide(object2D) {
        let xCollision = object2D.x < this.right && object2D.right > this.x;
        let yCollision = object2D.y < this.bottom && object2D.bottom > this.y;
    
        return xCollision && yCollision;
    }

    /**
     * Checks if the object is being hovered by the mouse 
     * @returns If the object is being hovered by the mouse
     */
    isMouseOver() {
        xOver = input.mousePos.x > this.x && input.mousePos.x < this.right;
        yOver = input.mousePos.y > this.y && input.mousePos.y < this.bottom;
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
}