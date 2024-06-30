class UIComponent extends Object2D {
    constructor(x = 50, y = 50, width = 50, height = 50, objectList = undefined) {
        super(x, y, width, height, objectList);
        this.children = {};
    }

    updateChildren() {
        for (let key in this.children) {
            let child = this.children[key];
            child.update();
        }
    }

    update() {
        
    }

    renderChildren() {
        for (let key in this.children) {
            let child = this.children[key];
            child.render();
        }
    }

    render() {
        this.gameCanvas.clear();
        this.ctx.fillStyle = "#666";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    set parent(comp) {
        this.$parent = comp;
        this.$parent.children[this.id] = this;
    }

    get parent() {
        return this.$parent;
    }
}