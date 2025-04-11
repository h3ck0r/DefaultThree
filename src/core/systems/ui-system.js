import { Pane } from 'tweakpane';
import { DirectionalLightHelper } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'

import { ActiveUIComponent } from '../components/ui-component';
import { CameraComponent, SceneComponent, ClockComponent, RendererComponent, EngineComponent } from "../components/core-components";
import { DirectionalLightComponent } from '../components/light-components';

export class UISystem {
    constructor(em) {
        const cameraComponent = em.getFistComponent(CameraComponent);
        const sceneComponent = em.getFistComponent(SceneComponent);
        const engineComponent = em.getFistComponent(EngineComponent)

        this.scene = sceneComponent.scene;
        this.camera = cameraComponent.camera;
        if (engineComponent.engine.isDebug) {

            this.setupTweakPane();
            const stats = Stats();
            document.body.appendChild(stats.dom)
            em.addComponent(em.createEntity(), new ActiveUIComponent(stats));

            const lightEntities = em.getEntitiesWithComponents(DirectionalLightComponent);
            for (const entity of lightEntities) {
                const directionalLightComponent = em.getComponent(entity, DirectionalLightComponent);
                const helper = new DirectionalLightHelper(directionalLightComponent.light, 1);
                this.scene.add(helper);
            }

        }
    }

    setupTweakPane() {
        const pane = new Pane();
        const f = pane.addFolder({
            title: 'Player Info',
            expanded: true,
        });
        f.addBinding(this.camera.position, 'x', {
            readonly: true
        });
        f.addBinding(this.camera.position, 'y', {
            readonly: true
        });
        f.addBinding(this.camera.position, 'z', {
            readonly: true
        });
    }

    update(em) {
        const entities = em.getEntitiesWithComponents(ActiveUIComponent);

        for (const entity of entities) {
            const activeUIComponent = em.getComponent(entity, ActiveUIComponent);
            activeUIComponent.ui.update();
        }
    }
}
