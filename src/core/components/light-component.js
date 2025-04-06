import { Component } from "./component";

export class LightComponent extends Component {
    constructor(light) {
        super();
        this.light = light;
        this.addedToScene = false;
    }
}
