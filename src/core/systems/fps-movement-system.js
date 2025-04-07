import * as THREE from "three";

import { InputComponent } from "../components/input-component";
import { CameraComponent } from "../components/core-components";

export class FPSMovementSystem {
    constructor(em, clock) {
        const cameraEntity = em.getEntityWithComponent(CameraComponent);
        const cameraComponent = em.getComponent(cameraEntity, CameraComponent);

        this.camera = cameraComponent.camera;
        this.clock = clock;
    }

    update(em, delta) {

        const entities = em.getEntitiesWithComponents(InputComponent);
        for (const entity of entities) {
            const input = em.getComponent(entity, InputComponent);

            let speed = 1;
            const direction = new THREE.Vector3();

            if (input.moveForward) direction.z -= 1;
            if (input.moveBackward) direction.z += 1;
            if (input.moveLeft) direction.x -= 1;
            if (input.moveRight) direction.x += 1;
            if (input.speedUp) speed = 5;

            direction.normalize().applyEuler(this.camera.rotation).multiplyScalar(speed * delta);
            this.camera.position.add(direction);
        }
    }
}
