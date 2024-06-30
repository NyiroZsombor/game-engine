class TextComponent extends UIComponent {
    constructor(msg, x, y, fontSize = 16, fontType = "Arial", maxWidth, objectList = undefined) {
        super(undefined, undefined, maxWidth, undefined, objectList);
        this.msg = msg;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
        // this.maxHeight;
        this.fontSize = fontSize;
        this.fontType = fontType;
        this.font = `${this.fontSize}px ${this.fontType}`;
        this.setStyle();
        
        if (this.maxWidth == undefined) {
            this.width = this.ctx.measureText(this.msg).width;
            this.height = this.fontSize;
        }
        else {
            this.height = this.formatText().length * this.fontSize;
        }

    }

    setStyle() {
        this.ctx.fillStyle = "#000";
        this.ctx.font = this.font;
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
    }

    render() {
        this.gameCanvas.clear();
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(0, 0, this.width, this.height);
        this.setStyle();

        if (this.maxWidth != undefined) {
            const formattedText = this.formatText();
            for (let i = 0; i < formattedText.length; i++) {
                let line = formattedText[i];
                this.ctx.fillText(line, 0, i * this.fontSize);
            }

            return;
        }
        this.ctx.fillText(this.msg, 0, 0);
    }

    // TODO text align: justified
    formatText() {
        const words = this.msg.split(" ");
        const formattedText = [`${words[0]} `];
        let currentWidth = this.ctx.measureText(words[0]).width;
        for (let i = 1; i < words.length; i++) {
            let word = words[i];
            let dim = this.ctx.measureText(` ${word}`);

            if (dim.width + currentWidth > this.maxWidth) {
               formattedText.push(`${word} `);
               currentWidth = dim.width;
               continue;
            }

            formattedText[formattedText.length - 1] += `${word} `;
            currentWidth += dim.width;
        }

        return formattedText;
    }
}