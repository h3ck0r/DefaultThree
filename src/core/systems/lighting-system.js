import { LightComponent } from "../components/light-components";

export class LightingSystem {
    constructor(scene) {
        this.scene = scene;
    }

    update(em) {
        const entities = em.getEntitiesWithComponents(LightComponent);
        
        for (const entity of entities) {
            const lightComponent = em.getComponent(entity, LightComponent);
            const light = lightComponent.light;

            if (!light.addedToScene) {
                this.scene.add(light);
                light.addedToScene = true;
            }
        }
    }
}
