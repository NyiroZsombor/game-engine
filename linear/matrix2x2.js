class Matrix2x2 {
    constructor(vec1 = new Vector2D(), vec2 = new Vector2D()) {
        this.x = vec1;
        this.y = vec2;
    }

    static matrixMultiplication(matrix1, matrix2) {
        const dimensions = ["x", "y"];
        const result = new Matrix2x2();
    
        for (let i of dimensions) {
            let currentRow = matrix1[i];
            for (let j of dimensions) {
                let currentCol = new Vector2D(
                    matrix2.x[j],
                    matrix2.y[j],
                );
        
                let currentDotProduct = dotProduct(currentRow, currentCol);
                result[i][j] = currentDotProduct;
            }
        }
        
        return result;
    }

    static createRotationMatrix(angle) {
        return new Matrix2x2(
            new Vector2D(Math.cos(angle), -Math.sin(angle)),
            new Vector2D(Math.sin(angle), Math.cos(angle))
        );
    }
}