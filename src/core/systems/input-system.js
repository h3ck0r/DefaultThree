import * as THREE from "three";

import { InputComponent } from "../components/input-component";

export class InputSystem {
    constructor() {
        this.keys = {};
        this.mouseDelta = { x: 0, y: 0 };

        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
        window.addEventListener('mousemove', (e) => {
            this.mouseDelta.x += e.movementX;
            this.mouseDelta.y += e.movementY;
        });
    }

    update(em) {
        const entities = em.getEntitiesWithComponents(InputComponent);
        for (const entity of entities) {
            const input = em.getComponent(entity, InputComponent);

            input.moveForward = !!this.keys['KeyW'];
            input.moveBackward = !!this.keys['KeyS'];
            input.moveLeft = !!this.keys['KeyA'];
            input.moveRight = !!this.keys['KeyD'];
            input.speedUp = !!this.keys["ShiftLeft"];

            input.rotation.y -= this.mouseDelta.x * 0.002;
            input.rotation.x -= this.mouseDelta.y * 0.002;

            this.mouseDelta.x = 0;
            this.mouseDelta.y = 0;
        }
    }
}
