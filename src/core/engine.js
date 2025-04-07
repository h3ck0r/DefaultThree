import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

import { EntityManager } from './base/entity-manager';
import { RenderSystem } from './systems/render-system';
import { MovementSystem } from './systems/movement-system';
import { LightingSystem } from './systems/lighting-system';
import { loadEntitiesFromJSON } from '../utils/entity-loader';
import { InputSystem } from './systems/input-system';
import { FPSMovementSystem } from './systems/fps-movement-system';
import { InputComponent } from './components/input-component';
import { CameraComponent, RendererComponent, SceneComponent } from './components/core-components';
import { UISystem } from './systems/ui-system';


export class Engine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.y = 1;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;

        this.clock = new THREE.Clock();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.className = 'webgl';
        document.body.appendChild(this.renderer.domElement);

        this.controls = new PointerLockControls(this.camera, this.renderer.domElement);

        this.em = new EntityManager();

        this.em.addComponent(this.em.createEntity(), new CameraComponent(this.camera));
        this.em.addComponent(this.em.createEntity(), new RendererComponent(this.renderer));
        this.em.addComponent(this.em.createEntity(), new SceneComponent(this.scene));

        this.renderSystem = new RenderSystem(this.scene);
        this.movementSystem = new MovementSystem();
        this.lightingSystem = new LightingSystem(this.scene);
        this.inputSystem = new InputSystem();
        this.fpsMovementSystem = new FPSMovementSystem(this.em, this.clock);

        this.renderer.domElement.addEventListener('click', this.requestPointerLock.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.animate = this.animate.bind(this);
    }

    onWindowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    requestPointerLock() {
        this.renderer.domElement.requestPointerLock();
    }

    async init() {
        await fetch("entities.json")
            .then((response) => response.json())
            .then((jsonData) => loadEntitiesFromJSON(jsonData, this.renderer, this.em));

        this.em.addComponent(this.em.createEntity(), new InputComponent());

        this.uiSystem = new UISystem(this.em);
        
        this.renderer.setAnimationLoop(this.animate);
    }

    animate() {
        const delta = this.clock.getDelta();
        this.controls.update(delta);

        this.inputSystem.update(this.em);
        this.fpsMovementSystem.update(this.em, delta);
        this.movementSystem.update(this.em);
        this.renderSystem.update(this.em);
        this.lightingSystem.update(this.em);
        this.uiSystem.update(this.em);

        this.renderer.render(this.scene, this.camera);
    }
}
