import { Component } from "./component";

export class CameraComponent extends Component {
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

export class EngineComponent extends Component {
    constructor(engine) {
        super();
        this.engine = engine;
    }
}

export class SceneComponent extends Component {
    constructor(scene) {
        super();
        this.scene = scene;
    }
}

export class ClockComponent extends Component {
    constructor(clock, label="") {
        this.clock = clock;
        this.label = label;
        this.marks = {};
        this.clock.start();
    }

    mark(label) {
        this.marks[label] = this.clock.getElapsedTime();
    }

    diff(label1, label2) {
        return (this.marks[label2] - this.marks[label1]).toFixed(3);
    }

    report() {
        for (const [label, time] of Object.entries(this.marks)) {
            console.log(`[${label}] at ${time.toFixed(3)}s`);
        }
    }
}