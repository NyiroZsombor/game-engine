class TextComponent extends UIComponent {
    constructor(msg, objectList = undefined) {
        super(objectList);
        this.msg = msg;
        this.font = "1em Arial";
        this.ctx.font = this.font;
        this.textDimensions = this.getTextDimensions();
        this.width = this.textDimensions.width;
        this.height = 16;
        this.x = this.y = 300;
    }

    getTextDimensions() {
        let textMeasure = this.ctx.measureText(this.msg);
        return textMeasure;
    }

    render() {
        this.gameCanvas.clear();
        this.ctx.fillStyle = "#000";
        this.ctx.font = "1em Arial";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(this.msg, 0, 0);
    }
}