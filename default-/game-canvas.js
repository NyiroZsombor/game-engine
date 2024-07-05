class GameCanvas {
    /**
     * Creates a GameCanvas object.
     * Access its context with GameCanvas.ctx
     * Access its canvas with GameCanvas.canvas
     * @param {Number} x - X position of the canvas
     * @param {Number} y - Y position of the canvas
     * @param {Number} w - Width of the canvas
     * @param {Number} h - Heigh of the canvas
     */
    constructor(x = 0, y = 0, w = 1, h = 1) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");

        var gameContainer = document.createElement("div");
        gameContainer.className = "game-container";
        gameContainer.appendChild(this.canvas);
        document.body.appendChild(gameContainer);

        this.canvas.style.position = "absolute";
        this.canvas.style.left = this.x + "px";
        this.canvas.style.top = this.y + "px";

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.canvas.style.display = "none";
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Renders the content of this GameCanvas to ctx
     * @param {CanvasRenderingContext2D} ctx - Context to render the content of the GameCanvas to
     * @param {Number} x - X position of GameCanvas on ctx
     * @param {Number} y - Y position of GameCanvas on ctx
     */
    toCtx(ctx, x = this.x, y = this.y) {
        ctx.drawImage(this.canvas, x, y);
    }

    set x(x) {
        this.$x = x;
        this.canvas.style.left = this.$x + "px";
    }

    set y(y) {
        this.$y = y;
        this.canvas.style.top = this.$y + "px";
    }

    set width(width) {
        this.$width = width;
        this.canvas.width = this.$width;
    }

    set height(height) {
        this.$height = height;
        this.canvas.height = this.$height;
    }

    get x() {return this.$x;}

    get y() {return this.$y;}

    get width() {return this.$width;}

    get height() {return this.$height;}

    /**
     * Sets the aspect ratio of the canvas to w : h
     * @param {Number} w - Relative width of the new canvas with respect to its relative height
     * @param {Number} h - Relative height of the new canvas with respect to its relative width
     */
    set ratio(ratio = {w: 16, h: 9}) {
        let wToH = (window.innerWidth / ratio.w) / (window.innerHeight / ratio.h);

        if (wToH > 1) {
            this.width = window.innerHeight / ratio.h * ratio.w;
            this.height = window.innerHeight;
            let x = window.innerWidth / 2 - this.width / 2;
            this.x = x;
        }
        else {
            this.width = window.innerWidth;
            this.height = window.innerWidth / ratio.w * ratio.h;
            let y = window.innerHeight / 2 - this.height / 2;
            this.y = y;
        }
    }

    /**
     * Sets if the canvas should be displayed all the time
     * @param {Boolean} value - If true the display of the canvas will be set to block, none otherwise
     */
    set display(value) {
        if (value) this.canvas.style.display = "block";
        else this.canvas.style.display = "none";
    }
}