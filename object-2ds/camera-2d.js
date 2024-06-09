/**
 * A camera object capable of rendering objects relative to it
 */
class Camera2D extends Object2D {
    /**
     * @constructor
     * @param {Object2D[]} objectList - The list of objects that should be rendered relative to the camera
     * @param {Number} followX - The fraction of the camera's width where it should start following the followObject on the x axis [0.0, 1.0]
     * @param {Number} followY - The fraction of the camera's height where it should start following the followObject on the y axis [0.0, 1.0]
     */
    constructor(objectList, followX = 0, followY = 0) {
        super(0, 0, canvas.width, canvas.height);
        this.objectList = objectList;
        this.followX = followX;
        this.followY = followY;
        this.zoom = 1;
    }
    
    /**
     * Centers the camera on a given position
     * @param {Number | undefined} x - X position the camara should be centered on
     * @param {Number | undefined} y - Y position the camara should be centered on
     */
    updatePosition(x = undefined, y = undefined) {
        if (x != undefined) this.x = x - this.width / 2;
        if (y != undefined) this.y = y - this.height / 2;

        if (this.followObject) {
            if (x != undefined) this.followArea.x = x - this.followArea.width / 2;
            if (y != undefined) this.followArea.y = y - this.followArea.height / 2;
        }
    }

    /**
     * Updates the camera
     */
    update() {
        //this.updatePosition(input.mousePos.x, input.mousePos.y);
        if (this.followObject) {
            let xDifference = this.followObject.centerX - this.centerX;
            if (xDifference > this.followArea.width / 2) {
                this.x += xDifference - this.followArea.width / 2;
            }
            if (xDifference < -this.followArea.width / 2) {
                this.x += xDifference + this.followArea.width / 2;
            }

            let yDifference = this.followObject.centerY - this.centerY;
            if (yDifference > this.followArea.height / 2) {
                this.y += yDifference - this.followArea.height / 2;
            }
            if (yDifference < -this.followArea.height / 2) {
                this.y += yDifference + this.followArea.height / 2;
            }
        }
    }

    /**
     * Renders the contents of the camera
     */
    render() {
        this.gameCanvas.clear();

        for (let key in this.objectList) {
            let obj = this.objectList[key];
            if (!this.collide(obj)) continue;
            if (obj == this) continue;

            obj.render();
            obj.gameCanvas.toCtx(this.ctx, obj.x + obj.gameCanvas.x - this.x, obj.y + obj.gameCanvas.y - this.y);
        }

        this.gameCanvas.toCtx(ctx);
    }

    set zoom(level) {
        this.$zoom = level;
        this.updatePosition(this.x + this.width / 2, this.y + this.height / 2);
        this.width = canvas.width / this.zoom;
        this.height = canvas.height / this.zoom;
    
        if (this.followObject) {
            this.followArea.width = this.width * this.followX;
            this.followArea.height = this.height * this.followY;
        }
    }

    get zoom() {
        return this.$zoom
    }

    set followObject(object2D) {
        this.$followObject = object2D;

        if (this.followArea == undefined) {
            this.followArea = new Object2D(
                this.x + this.width / 2 * this.followX,
                this.y + this.height / 2 * this.followY,
                Math.floor(this.width * this.followX),
                Math.floor(this.height * this.followY),
            );
        }
        else {
            this.followArea.x = this.x + this.width / 2 * this.followX;
            this.followArea.y = this.y + this.height / 2 * this.followY;
            this.followArea.width = this.width * this.followX;
            this.followArea.height = this.height * this.followY;
        }
        
        this.updatePosition(
            this.followObject.x + this.followObject.width * this.zoom / 2,
            this.followObject.y + this.followObject.height * this.zoom / 2,
        );
    }

    get followObject() {
        return this.$followObject;
    }

    set x(x) {
        super.x = x;
        if (this.followArea) this.followArea.x = this.x + this.width / 2 - this.followArea.width / 2;
    }

    set y(y) {
        super.y = y;
        if (this.followArea) this.followArea.y = this.y + this.height / 2 - this.followArea.height / 2;
    }

    get x() {
        return super.x;
    }

    get y() {
        return super.y;
    }
}