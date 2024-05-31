class Button {
    constructor(properties) {
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 150;
        this.lineWidth = canvas.width / 80;
        this.color = "#000";
        this.highlightColor = "#FFF";
        this.pressed = false;
        this.highlightMouseOver = false;
        this.text = "Template";
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.font = canvas.width / 9 + "px arial";
        this.toggleable = true;

        for (var key in properties) {
            this[key] = properties[key];
        }

        if (this.textX == undefined) this.textX = this.width / 2;
        if (this.textY == undefined) this.textY = this.height / 2;
        if (this.strokeColor == undefined) this.strokeColor = this.highlightColor;
        if (this.textColor == undefined) this.textColor = this.highlightColor;
        if (this.textHighlightColor == undefined) this.textHighlightColor = this.color;

    }

    update(buttonList = []) {
        this.mouseOver = isMouseOverRect(this.x, this.y, this.width, this.height);
        if (this.mouseOver && clicked) this.pressed = this.toggleable ? !this.pressed : true;
        else return;

        for (var i = 0; i < buttonList.length; i++) {
            var button = buttonList[i];

            if (button == this) continue;

            if (button.pressed) {
                button.pressed = false;
                return buttonList.indexOf(this);
            }
        }
    }

    render() {
        this.renderBackground();
        this.renderText();
    }

    renderBackground() {
        ctx.fillStyle = this.pressed || (this.mouseOver && this.highlightMouseOver) ? this.highlightColor : this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    renderText() {
        ctx.fillStyle = !(this.pressed || (this.mouseOver && this.highlightMouseOver)) ? this.textColor : this.textHighlightColor;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x + this.textX, this.y + this.textY);
    }
}