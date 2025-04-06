import { Component } from "./component";

export class TransformComponent extends Component {
    constructor(position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }) {
        super();
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}
