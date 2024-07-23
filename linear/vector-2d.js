class Vector2D {
    colors = ["red", "lime", "green", "pink", "orange", "purple", "yellow", "blue", "cyan"];

    constructor(x = 0, y = 0, color = undefined) {
        this.x = x;
        this.y = y;
        this.length = Math.hypot(this.x, this.y);
        this.angle = Math.atan2(this.y, this.x);
        this.color = color || this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    static scaleVector(vec, scalar) {
        const result = new Vector2D(vec.x * scalar, vec.x * scalar);
        
        return result;
    }

    static addVectors(vec1, vec2) {
        const result = new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y);

        return result;
    }

    static dotProduct(vec1, vec2) {
        const result = vec1.x * vec2.x + vec1.y * vec2.y;

        return result;
    }

    static linearTransformation(vec, matrix) {
        const result = new Vector2D(
            Vector2D.dotProduct(vec, matrix.x),
            Vector2D.dotProduct(vec, matrix.y),
        )

        return result;
    }

    render(ctx, x, y) {
        const arrowSize = 10;
        const hand1 = new Vector2D(-arrowSize, arrowSize);
        const hand2 = new Vector2D(-arrowSize, -arrowSize);

        // TODO: optimize, kinda slow with matrices
        const rotationMatrix = Matrix2x2.createRotationMatrix(this.angle);
        const rotatedHand1 = Vector2D.linearTransformation(hand1, rotationMatrix);
        const rotatedHand2 = Vector2D.linearTransformation(hand2, rotationMatrix);

        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.x, y + this.y);
        ctx.lineTo(x + this.x + rotatedHand1.x, y + this.y + rotatedHand1.y);
        ctx.moveTo(x + this.x, y + this.y);
        ctx.lineTo(x + this.x + rotatedHand2.x, y + this.y + rotatedHand2.y);
        ctx.stroke();
    }
}