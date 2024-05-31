/**
 * An object with basic physic functioanlites
 * @todo jumping
 */
class PhysicsObject2D extends Object2D {
    /**
     * @constructor
     * @param {Number} x - X position of the object
     * @param {Number} y - Y position of the object
     * @param {Number} w - Width of the object
     * @param {Number} h - Height of the object
     * @param {*} collisionLayerNums 
     * @param {*} collisionMaskNums 
     */
    constructor(x, y, w, h, collisionLayerNums, collisionMaskNums) {
        super(x, y, w, h, collisionLayerNums);
        this.collisionMaskNums = collisionMaskNums;

        this.velX = 0;
        this.velY = 0;
        this.speed = 160;
        this.gravity = 1200;
        this.dragCoefficient = 8;

        this.jumpTimer = 0;
        this.jumpTime = 0.5;
        this.jumpForce = this.gravity * 100;
    }

    jump(dt) {
        if (this.jumpTimer <= 0) return;
        this.jumpTimer -= dt;
        this.velY = -this.jumpForce * dt;
    }

    /**
     * Checks collsions all objects in this.collisionList on a given axis and updates the properties of this object accordingly
     * @param {"x" | "y"} axis - The axis to perform the calculations on
     */
    collisions(axis) {
        const dimmensions = {"x": "width", "y": "height"};
        const velocites = {"x": "velX", "y": "velY"};

        let dim = dimmensions[axis];
        let vel = velocites[axis];
        
        for (let i = 0; i < this.collisionMaskNums.length; i++) {
            let currentCollisionLayerNum = this.collisionMaskNums[i];
            
            for (let i = 0; i < collisionLayers[currentCollisionLayerNum].length; i++) {
                let collider = collisionLayers[currentCollisionLayerNum][i];
                
                if (this == collider) continue;
                if (!this.collide(collider)) continue;

                if (collider[vel] != undefined) {
                    let temp = this[vel];
                    this[vel] += collider[vel] * dt;
                    collider[vel] += temp * dt;
                }
                
                let dir1Collision = this[axis] + this[dim] >= collider[axis] && this.previous[axis] + this.previous.height <= collider[axis];
                let dir2Collision = this[axis] <= collider[axis] + collider[dim] && this.previous[axis] >= collider[axis] + collider[dim];
                
                if (dir1Collision && axis == "y") this.jumpTimer = this.jumpTime;

                if (dir1Collision) this[axis] = collider[axis] - this[dim];
                if (dir2Collision) this[axis] = collider[axis] + collider[dim];
            }
        }
    }

    /**
     * Updates the position of the object
     * @param {Number} dt - Time elapsed since the last frame in seconds
     */
    move(dt) {
        this.previous = {x: this.x, y: this.y, width: this.width, height: this.height};
        this.velY += this.gravity * this.dragCoefficient * dt;
        let decayFactor = Math.exp(-this.dragCoefficient * dt);
        this.velX *= decayFactor;
        this.velY *= decayFactor;
    
        this.x += this.velX * dt;
        this.collisions("x");
        this.y += this.velY * dt;
        this.collisions("y");
    }

    /**
     * Updating the properties of the object
     * @param {Number} dt - Time elapsed since the last frame in seconds
     */
    update(dt) {}
}