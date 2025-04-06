import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { MeshComponent } from '../core/components/mesh-component';
import { TransformComponent } from '../core/components/transform-component';
import { LightComponent } from '../core/components/light-component';

function createMeshEntity(entityData, em) {
    let geometry = null;
    let material = null;
    let mesh = null;

    if (entityData.mesh.type === "BoxGeometry") {
        geometry = new THREE.BoxGeometry();
        material = new THREE.MeshStandardMaterial({ color: new THREE.Color(entityData.mesh.color) });
        mesh = new THREE.Mesh(geometry, material);
    }

    em.addComponent(entityData.entity, new MeshComponent(mesh));
    em.addComponent(entityData.entity, new TransformComponent(entityData.position));
}

function createLightEntity(entityData, em) {
    let light = null;

    if (entityData.light.type === "PointLight") {
        light = new THREE.PointLight(entityData.light.color, entityData.light.intensity);
        light.position.set(entityData.position.x, entityData.position.y, entityData.position.z);
    } else if (entityData.light.type === "AmbientLight") {
        light = new THREE.AmbientLight(entityData.light.color, entityData.light.intensity);
    } else if (entityData.light.type === "HemisphereLight") {
        light = new THREE.HemisphereLight(entityData.light.skyColor, entityData.light.groundColor);
    }

    if (!light) {
        console.error("Invalid Light Type!");
        return;
    }

    em.addComponent(entityData.entity, new LightComponent(light));
}

async function createModelEntity(entityData, em) {
    const loader = new GLTFLoader();

    try {
        const gltf = await new Promise((resolve, reject) => {
            loader.load(entityData.src, resolve, undefined, reject);
        });

        const model = gltf.scene;
        model.position.set(entityData.position.x, entityData.position.y, entityData.position.z);

        em.addComponent(entityData.entity, new MeshComponent(model));
        em.addComponent(entityData.entity, new TransformComponent(entityData.position));
    } catch (error) {
        console.error('Error loading GLTF model:', error);
    }
}

export async function loadEntitiesFromJSON(jsonData, em) {
    jsonData.entities.forEach((entityData) => {
        const entity = em.createEntity();

        if (entityData.type === "object") {
            createMeshEntity({ entity, ...entityData }, em);
        } else if (entityData.type === "light") {
            createLightEntity({ entity, ...entityData }, em);
        } else if (entityData.type === "model") {
            createModelEntity({ entity, ...entityData }, em);
        }
    });
}
