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

const maxCollisionListLength = 5;
const collisionList = [];

for (let i = 0; i < maxCollisionListLength; i++) {
    collisionList.push([]);
}

loadObject2Ds();