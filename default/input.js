/**
 * An Input object capable of handling keyboard and mouse inputs 
 */
class Input {
    actionKeys = {}; // {code: actionName ...}
    actionFunctionalities = {}; // {actionName: action ...}
    preventDefaultKeyActionList = [];

    /**
     * Creation an Action object for a keyboard input
     * @param {String} code - The code of the key to activate the action
     * @param {String} name - The name of the action
     * @param {Object} caller - the The object to call functions on
     */
    createAction(code, actionName, caller = undefined) {
        let action;
        this.actionKeys[code] = actionName;
        if (this.actionFunctionalities[actionName] == undefined) {
            action = new Action(this, actionName, caller);
            this.actionFunctionalities[actionName] = action;
        }
        if (!this.preventDefaultKeyActionList.includes(code)) {
            this.preventDefaultKeyActionList.push(code);
        }
    }
    /**
     * Sets up predefined actions
     */
    loadDefaultActions() {
        this.createAction("F3", "debug");
        this.actionFunctionalities["debug"].onJustPress = function() {
            debug = !debug;
            if (debug) console.log("debug on");
            else console.log("debug off");
        }
    }

    /**
     * Loads keyboard related event listeners
     */
    loadKeyboard() {
        this.keysPressed = {};
        this.loadDefaultActions();

        document.addEventListener("keydown", e => {
            const keyPress = this.keysPressed[e.code];
            const actionName = this.actionKeys[e.code];
            let action;
            
            if (this.preventDefaultKeyActionList.includes(e.code)) e.preventDefault();
            if (e.repeat) return;
            if (actionName) action = this.actionFunctionalities[actionName];

            if (keyPress == undefined) {
                this.keysPressed[e.code] = 1;
                if (actionName) {
                    action.justPressed = true;
                    if (action.caller) action.onJustPress.call(action.caller);
                    else action.onJustPress();
                }
            }
            else {
                this.keysPressed[e.code]++;
                if (actionName) {
                    action.pressFrames++;
                    if (action.caller) action.onPress.call(action.caller, action.pressFrames);
                    else action.onPress(action.pressFrames);
                }
            }
        });
    
        document.addEventListener("keyup", e => {
            const keyPress = this.keysPressed[e.code];
            const actionName = this.actionKeys[e.code];
            let action;

            if (this.preventDefaultKeyActionList.includes(e.code)) e.preventDefault();
            if (actionName) action = this.actionFunctionalities[actionName];

            if (keyPress != undefined) {
                delete this.keysPressed[e.code];
                if (actionName) {
                    action.pressFrames = 0;
                }
            }
        });
    }

    updateMousePos(e) {
        this.mouse.pos.x = e.clientX;
        this.mouse.pos.y = e.clientY;
    }

    updateMouseKeys(e, value) {
        const mouseButtons = ["left", "right", "middle", "back", "forward"];
        let eventButons = Number(e.buttons);

        for (let i = mouseButtons.length; i >= 0; i--) {
            let key = mouseButtons[i];
            let power = 2**i;
            if (eventButons >= power) {
                eventButons -= power;
                if (value === 1) this.mouse.pressed[key] = 1;
            }
            else {
                delete this.mouse.pressed[key];
            }
        }
    }

    updateMouseWheel(e) {
        this.mouse.scroll = Math.sign(e.deltaY);
    }
 
    /**
     * Loads mouse related event listeners
     */
    loadMouse() {
        this.mouse = {
            pos: {x: undefined, x: undefined},
            scroll: 0,
            pressed: {}
        };

        window.addEventListener("mousemove", e => {
            this.updateMousePos(e);
        });

        window.addEventListener("mousedown", e => {
            this.updateMousePos(e);
            this.updateMouseKeys(e, 1);
        });

        window.addEventListener("mouseup", e => {
            this.updateMousePos(e);
            this.updateMouseKeys(e, 0);
        });

        window.addEventListener("wheel", e=> {
            this.updateMouseWheel(e);
        });
    }

    /**
     * Runs every frame, updates the properties of the object
     */
    update() {
        for (let key in this.keysPressed) this.keysPressed[key]++;
        for (let key in this.mouse.pressed) this.mouse.pressed[key]++;
    }

    get keysPressed() {
        if (this.$keysPressed == undefined) {
            console.error("Tried to access keysPressed before loading keyboard");
        }
        else {
            return this.$keysPressed;
        }
    }

    get mouse() {
        if (this.$mouse == undefined) {
            console.error("Tried to access mouse before loading mouse");
        }
        else {
            return this.$mouse;
        }
    }

    set keysPressed(value) {
        this.$keysPressed = value;
    }

    set mouse(value) {
        this.$mouse = value;
    }
}