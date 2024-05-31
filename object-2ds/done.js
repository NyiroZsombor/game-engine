const maxCollisionLayersLength = 5;
const collisionLayers = [];
const object2Ds = [];
debugObj.debugRenderList = object2Ds;
const camera = new Camera2D(object2Ds);

for (let i = 0; i < maxCollisionLayersLength; i++) {
    collisionLayers.push([]);
}
