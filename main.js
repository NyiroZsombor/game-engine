debug = true;
objs = [];
new Object2D(50, 50, 50, 300, objs);
o1 = new PhysicsObject2D(500, 500, 100, 100, objs);
o2 = new PhysicsObject2D(300, 500, 100, 100, objs);
o1.gravity = 0;
o2.gravity = 0;
o1.speed = 40;
o1.color = "#F00";
o2.color = "#0F0";
debugObj.debugRenderList = objs;
console.log(objs);

o1.update = o2.update = function(dt) {
    this.move(dt);
}

o1.render = o2.render = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);

    //this.gameCanvas.toCtx(ctx, this.x, this.y);
}

function update(dt) {
    if (input.keysPressed["KeyD"]) o2.velX += o2.speed;
    if (input.keysPressed["KeyA"]) o2.velX += -o2.speed;
    if (input.keysPressed["KeyW"]) o2.velY += -o2.speed;
    if (input.keysPressed["KeyS"]) o2.velY += o2.speed;

    if (input.keysPressed["ArrowRight"]) o1.velX += o1.speed;
    if (input.keysPressed["ArrowLeft"]) o1.velX += -o1.speed;
    if (input.keysPressed["ArrowUp"]) o1.velY += -o1.speed;
    if (input.keysPressed["ArrowDown"]) o1.velY += o1.speed;

    //o1.velX = Math.sin(Date.now() / 1000 * Math.PI) * 100;

    o1.update(dt);
    o2.update(dt);
}

function render() {
    o1.render();
    o2.render();
    o1.gameCanvas.toCtx(ctx, o1.x, o1.y);
    o2.gameCanvas.toCtx(ctx, o2.x, o2.y);
}