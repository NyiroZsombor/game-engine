const maxCollisionLayersLength = 5;
const collisionLayers = [];
const object2Ds = {};
let currentId = 0;
debugObj.debugRenderList = object2Ds;
const camera = new Camera2D(object2Ds, 0.5, 0.5);

for (let i = 0; i < maxCollisionLayersLength; i++) {
    collisionLayers.push([]);
}
