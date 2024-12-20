class ButtonComponent extends UIComponent {
    constructor(x, y, width, height, objectList = undefined) {
        super(x, y, width, height, objectList);
        this.clicked = 0;
    }

    onClick() {}
    onHold() {}
    //onRelease() {}

    updateMouseEvents() {
        if (this.clicked != 0) this.clicked++;
        if (this.isMouseOver() && input.mouseDown == 1) {
            this.onClick();
            if (this.clicked > 0) this.clicked = 0;
            else this.clicked++;
        }
        else if (this.isMouseOver() && input.mouseDown > 1) {
            this.onHold();
        }
    }

    update() {}

    renderDefault() {
        this.ctx.fillStyle = "#999";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "#CCC";
        this.ctx.strokeRect(2, 2, this.width - 4, this.height - 4);
    }

    renderClicked() {
        this.renderDefault();

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#EEE";
        this.ctx.beginPath();
        this.ctx.moveTo(this.width / 4, this.height / 2);
        this.ctx.lineTo(this.width / 2, this.height / 4 * 3);
        this.ctx.lineTo(this.width / 4 * 3, this.height / 4);
        this.ctx.stroke();
    }

    renderHovered() {
        this.ctx.strokeStyle = "#0A8";
        this.ctx.strokeRect(0, 0, this.width, this.height);
    }

    render() {
        this.gameCanvas.clear();
        if (this.clicked > 0) this.renderClicked();
        else this.renderDefault();
        if (this.isMouseOver()) this.renderHovered();
    }
}