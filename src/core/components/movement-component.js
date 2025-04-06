import { Component } from "./component";

export class MovementComponent extends Component {
    constructor(speed = { x: 0, y: 0, z: 0 }) {
        super();
        this.speed = speed;
    }
}
