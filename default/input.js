/**
 * An Input object capable of handling keyboard and mouse inputs 
 */
class Input {
    /**
     * @constructor
     */
    constructor() {
        this.keysPressed = {};
        this.mousePos = {x: undefined, y: undefined};
        this.actionKeys = {}; // {code: actionName ...}
        this.actionFunctionalities = {}; // {actionName: action ...}
        this.preventDefaultKeyActionList = [];
        
        this.loadKeyboard();
    }

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
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
    }
 
    /**
     * Loads mouse related event listeners
     */
    loadMouse() {
        document.addEventListener("mousemove", e => {
            this.updateMousePos(e);
        });

        document.addEventListener("mousedown", e => {
            this.updateMousePos(e);
            this.mouseDown = 1;
        });

        document.addEventListener("mouseup", e => {
            this.updateMousePos(e);
            this.mouseDown = 0;
        });
    }

    /**
     * Runs every frame, updates the properties of the object
     */
    update() {
        for (let key in this.keysPressed) this.keysPressed[key]++;
        if (this.mouseDown > 0) this.mouseDown++;
    }
}