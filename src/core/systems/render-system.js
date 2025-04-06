import { MeshComponent } from '../components/mesh-component.js';
import { TransformComponent } from '../components/transform-component.js';

export class RenderSystem {
    constructor(scene) {
        this.scene = scene;
    }

    update(em) {
        const entities = em.getEntitiesWithComponents(MeshComponent, TransformComponent);

        for (const entity of entities) {
            const meshComponent = em.getComponent(entity, MeshComponent);
            const transform = em.getComponent(entity, TransformComponent);
            const mesh = meshComponent.mesh;

            if (!meshComponent.addedToScene) {
                this.scene.add(mesh);
                meshComponent.addedToScene = true;
            }

            mesh.position.set(transform.position.x, transform.position.y, transform.position.z);
            mesh.rotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
            mesh.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
        }
    }
}
