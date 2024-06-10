const maxCollisionLayersLength = 5;
const collisionLayers = [];
let currentId = 0;
const camera = new Camera2D(0.5, 0.5);

for (let i = 0; i < maxCollisionLayersLength; i++) {
    collisionLayers.push([]);
}
