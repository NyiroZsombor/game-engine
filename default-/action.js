/**
 * An action containing functions triggered by the Input object
 */
class Action {
    /**
     * @constructor
     * @param {Input} input - The parent input object
     * @param {String} name - the name of the action
     * @param {Object} caller - The object to call functions on
     */
    constructor(input, name, caller = undefined) {
        this.input = input;
        this.name = name;
        this.caller = caller

        this.pressed = false;
        this.justPressed = false;
        this.pressFrames = 0;
    }
/*
    update() {
        this.pressed = this.input.keysPressed[this.code];
        this.justPressed = false;

        if (this.pressed) {
            this.pressFrames++;
            if (this.caller) this.onPress.call(this.caller, this.pressFrames);
            else this.onPress(this.pressFrames);
        }
        else {
            this.pressFrames = 0;
        }

        if (this.pressFrames == 1) {
            this.justPressed = true;
            if (this.caller) this.onJustPress.call(this.caller);
            else this.onJustPress();
        }
    }
*/

    /**
     * Runs once when the action is first triggered 
     */
    onJustPress() {}

    /**
     * Runs every frame while the action is being held
     * @param {Number} pressFrames - The length of the action press in frames
     */
    onPress(pressFrames) {}
}