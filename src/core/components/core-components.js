import { Component } from "./component";

export class CameraComponent extends Component{
    constructor(camera) {
        super();
        this.camera = camera;
    }
}

export class RendererComponent extends Component {
    constructor(renderer) {
        super();
        this.renderer = renderer;
    }
}

export class SceneComponent extends Component{
    constructor(scene){
        super();
        this.scene = scene;
    }
}