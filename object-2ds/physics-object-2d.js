/**
 * An object with basic physics functioanlites
 * @todo fix jumping
 */
class PhysicsObject2D extends Object2D {
    /**
     * @constructor
     * @param {Number} x - X position of the object
     * @param {Number} y - Y position of the object
     * @param {Number} w - Width of the object
     * @param {Number} h - Height of the object
     * @param {Number[]} collisionLayerNums - The list of layers that specify which objects can collide with this object 
     * @param {Number[]} collisionMaskNums - The list of layers that specify which objects can this object collide with
     */
    constructor(x, y, w, h, collisionLayerNums = [], collisionMaskNums = []) {
        super(x, y, w, h, collisionLayerNums);
        this.collisionMaskNums = collisionMaskNums;

        this.velX = 0;
        this.velY = 0;
        this.normalVelocitiesX = {};
        this.normalVelocitiesY = {};
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
        let collision = false;
        
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
                
                collision = true;
                let dir1Collision = this[axis] + this[dim] >= collider[axis] && this.previous[axis] + this.previous.height <= collider[axis];
                let dir2Collision = this[axis] <= collider[axis] + collider[dim] && this.previous[axis] >= collider[axis] + collider[dim];
                
                if (dir1Collision && axis == "y") this.jumpTimer = this.jumpTime;

                if (dir1Collision) this[axis] = collider[axis] - this[dim];
                if (dir2Collision) this[axis] = collider[axis] + collider[dim];
            }
        }

        return collision;
    }

    /**
     * Updates the position of the object
     * @param {Number} dt - Time elapsed since the last frame in seconds
     */
    move(dt) {
        this.previous = {x: this.x, y: this.y, width: this.width, height: this.height};
        this.velY += this.gravity * this.dragCoefficient * dt;
    
        this.x += this.velX * dt;
        this.collisions("x");
        this.y += this.velY * dt;
        this.collisions("y");

        let decayFactor = 0;
        if (this.dragCoefficient != -1) decayFactor = Math.exp(-this.dragCoefficient * dt);
        this.velX *= decayFactor;
        this.velY *= decayFactor;
    }

    /**
     * Updating the properties of the object
     * @param {Number} dt - Time elapsed since the last frame in seconds
     */
    update(dt) {}

    get normVel() {
        let normVelX = this.normalVelocitiesX[this.velX];
        let normVelY = this.normalVelocitiesY[this.velY];
        let normVel = {x: undefined, y: undefined};
        if (normVelX != undefined) {
            normVel.x = normVelX;
            normVel.y = normVelY;
        }
        else {
            let dist = Math.hypot(this.velX, this.velY);
            normVelX = this.normalVelocitiesX[this.velX] = this.velX / dist;
            normVelY = this.normalVelocitiesY[this.velY] = this.velY / dist;
        }

        return {x: normVelX, y: normVelY};
    }

    get normVelX() {
        return this.normVel.x;
    }

    get normVelY() {
        return this.normVel.y;
    }
}