import { Pane } from 'tweakpane';
import { DirectionalLightHelper } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'

import { ActiveUIComponent } from '../components/ui-component';
import { CameraComponent, SceneComponent } from "../components/core-components";
import { DirectionalLightComponent } from '../components/light-components';

export class UISystem {
    constructor(em) {
        const cameraEntity = em.getEntityWithComponent(CameraComponent);
        const cameraComponent = em.getComponent(cameraEntity, CameraComponent);

        const sceneEntity = em.getEntityWithComponent(SceneComponent);
        const sceneComponent = em.getComponent(sceneEntity, SceneComponent);

        this.scene = sceneComponent.scene;
        this.camera = cameraComponent.camera;

        this.isDebug = location.hash.indexOf('debug') !== -1;
        if (this.isDebug) {
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
