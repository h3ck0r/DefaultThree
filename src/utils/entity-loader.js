import * as THREE from 'three';
import { MeshComponent } from '../core/components/mesh-component';
import { TransformComponent } from '../core/components/transform-component';
import { MovementComponent } from '../core/components/movement-component';
import { LightComponent } from '../core/components/light-component';

export function loadEntitiesFromJSON(jsonData, em) {
    jsonData.entities.forEach((entityData) => {
        const entity = em.createEntity();

        if (entityData.type === "object") {
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(entityData.mesh.color) });
            const mesh = new THREE.Mesh(geometry, material);

            em.addComponent(entity, new MeshComponent(mesh));
            em.addComponent(entity, new TransformComponent(entityData.position));
            em.addComponent(entity, new MovementComponent(entityData.movement.speed));

        } else if (entityData.type === "light") {
            let light = null;
            if (entityData.light.type == "PointLight") {
                light = new THREE.PointLight(entityData.light.color, entityData.light.intensity);
                light.position.set(entityData.position.x, entityData.position.y, entityData.position.z);
            }
            else if (entityData.light.type == "AmbientLight") {
                light = new THREE.AmbientLight(entityData.light.color, entityData.light.intensity);
            }

            if (!light) {
                console.error("Invalid Light Type!");
            }

            em.addComponent(entity, new LightComponent(light));
        }
    });
}
