/**
 * A camera object capable of rendering objects relative to it
 */
class Camera2D extends Object2D {
    /**
     * @constructor
     * @param {Object2D[]} objectList - The list of objects that should be rendered relative to the camera
     * @param {Object2D | undefined} followObject - The object the camara should be centered on
     * @param {Number} followX - The fraction of the camera's width where it should start following the followObject on the x axis [0.0, 1.0]
     * @param {Number} followY - The fraction of the camera's height where it should start following the followObject on the y axis [0.0, 1.0]
     */
    constructor(objectList, followObject = undefined, followX = 0, followY = 0) {
        super(0, 0, canvas.width, canvas.height);
        this.objectList= objectList;
        this.followX = followX;
        this.followY = followY;
        this.zoom = 1;
        
        this.followObject = followObject;
        if (this.followObject) {
            this.followArea = new Object2D(
                this.x + this.width / 2 * followX,
                this.y + this.height / 2 * followY,
                this.width * this.followX,
                this.height * this.followY,
            );
            
            this.updatePosition(
                this.followObject.x + this.followObject.width * this.zoom / 2,
                this.followObject.y + this.followObject.height * this.zoom / 2,
            );
        }
    }
    
    /**
     * Centers the camera on a given position
     * @param {Number} x - X position the camara should be centered on
     * @param {Number} y - Y position the camara should be centered on
     */
    updatePosition(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;

        if (this.followObject) {
            this.followArea.x = x - this.followArea.width / 2;
            this.followArea.y = y - this.followArea.height / 2;
        }
    }

    /**
     * Updates the camera
     */
    update() {
        if (this.followObject) {
            if (this.followObject.x < this.followArea.x || this.followObject.x + this.followObject.width > this.followArea.x + this.followArea.width) {
                this.updatePosition(this.followObject.x + this.followObject.width * this.zoom / 2, this.y + this.height);
                console.log("x");
            }

            if (this.followObject.y < this.followArea.y || this.followObject.y + this.followObject.height > this.followArea.y + this.followArea.height) {
                this.updatePosition(this.x + this.width, this.followObject.y + this.followObject.height * this.zoom / 2);
                console.log("y");
            }
            
            /*  
            this.updatePosition(
            this.followObject.x + this.followObject.width * this.zoom / 2,
            this.followObject.y + this.followObject.height * this.zoom / 2,
            );
            */
        }
    }

    /**
     * Sets the zoom of the camera and updates its position
     * @param {Number} level - Zoom level to be set 
     */
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
    /**
     * Gets the zoom of the camera
     */
    get zoom() {
        return this.$zoom
    }

    /**
     * Renders the contents of the camera
     */
    render() {
        this.gameCanvas.clear();

        for (let i = 0; i < this.objectList.length; i++) {
            let obj = this.objectList[i];
            if (!this.collide(obj)) continue;
            if (obj == this) continue;

            obj.render(this.gameCanvas);
            obj.gameCanvas.toCtx(this.ctx,
                obj.x - this.x,
                obj.y - this.y,
           );
        }

        this.gameCanvas.toCtx(ctx);
    }
}