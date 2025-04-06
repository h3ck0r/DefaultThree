import * as THREE from 'three';
import { EntityManager } from './base/entity-manager';
import { RenderSystem } from './systems/render-system';
import { MovementSystem } from './systems/movement-system';
import { LightingSystem } from './systems/lighting-system';
import { loadEntitiesFromJSON } from '../utils/entity-loader';

export class Engine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.clock = new THREE.Clock();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.em = new EntityManager();
        this.renderSystem = new RenderSystem(this.scene);
        this.movementSystem = new MovementSystem();
        this.lightingSystem = new LightingSystem(this.scene);

        this.animate = this.animate.bind(this);
    }
    async init() {
        await fetch("entities.json")
            .then((response) => response.json())
            .then((jsonData) => loadEntitiesFromJSON(jsonData, this.em));
        this.renderer.setAnimationLoop(this.animate);
    }

    animate() {
        this.movementSystem.update(this.em);
        this.renderSystem.update(this.em);
        this.lightingSystem.update(this.em);
        this.renderer.render(this.scene, this.camera);
    }
}
