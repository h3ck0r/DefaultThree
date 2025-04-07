import { Component } from "./component";

export class LightComponent extends Component {
    constructor(light) {
        super();
        this.light = light;
        this.addedToScene = false;
    }
}

export class DirectionalLightComponent extends LightComponent {
    constructor(light) {
        super(light);
    }
}

export class PointLightComponent extends LightComponent {
    constructor(light) {
        super(light);
    }
}

export class AmbientLightComponent extends LightComponent {
    constructor(light) {
        super(light);
    }
}

export class SpotLightComponent extends LightComponent {
    constructor(light) {
        super(light);
    }
}

export class HemisphereLightComponent extends LightComponent {
    constructor(light) {
        super(light);
    }
}