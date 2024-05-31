/**
 * Loads 2D Objects from the object-2ds folder
 */
async function loadObject2Ds() {
    await appendScript("object-2ds/object-2d.js"),
    await Promise.all([
        appendScript("object-2ds/physics-object-2d.js"),
        appendScript("object-2ds/camera-2d.js"),
    ]);
}

loadObject2Ds();

const maxCollisionLayersLength = 5;
const collisionLayers = [];

for (let i = 0; i < maxCollisionLayersLength; i++) {
    collisionLayers.push([]);
}
