import { Component } from "./component";

export class MeshComponent extends Component {
    constructor(mesh) {
        super();
        this.mesh = mesh;
        this.addedToScene = false;
    }
}
