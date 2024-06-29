class UIComponent extends Object2D {
    constructor(objectList = undefined) {
        super(50, 50, 50, 50, objectList);
        this.children = {};
    }

    set parent(comp) {
        this.$parent = comp;
        this.$parent.children[this.id] = this;
    }

    get parent() {
        return this.$parent;
    }
}