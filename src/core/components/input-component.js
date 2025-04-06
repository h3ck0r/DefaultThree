import { Component } from "./component";

export class InputComponent extends Component{
    constructor() {
        super();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.speedUp = false;
        this.rotation = { x: 0, y: 0 };
    }
}
