import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

import { LightComponent } from '../core/components/light-components';
import { MeshComponent } from '../core/components/mesh-component';
import { TransformComponent } from '../core/components/transform-component';
import { DirectionalLightComponent, PointLightComponent, AmbientLightComponent, HemisphereLightComponent } from '../core/components/light-components';

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

        em.addComponent(entityData.entity, new PointLightComponent(light));
        em.addComponent(entityData.entity, new LightComponent(light));
    } else if (entityData.light.type === "AmbientLight") {
        light = new THREE.AmbientLight(entityData.light.color, entityData.light.intensity);

        em.addComponent(entityData.entity, new AmbientLightComponent(light));
        em.addComponent(entityData.entity, new LightComponent(light));
    } else if (entityData.light.type === "HemisphereLight") {
        light = new THREE.HemisphereLight(entityData.light.skyColor, entityData.light.groundColor);

        em.addComponent(entityData.entity, new HemisphereLightComponent(light));
        em.addComponent(entityData.entity, new LightComponent(light));
    } else if (entityData.light.type === "DirectionalLight") {
        light = new THREE.DirectionalLight(entityData.light.color, entityData.light.intensity);
        light.castShadow = entityData.light.castShadow;

        if (light.castShadow) {
            light.shadow.mapSize.width = entityData.light.width;
            light.shadow.mapSize.height = entityData.light.height;
            light.shadow.camera.near = entityData.light.near;
            light.shadow.camera.far = entityData.light.far;
            light.shadow.camera.left =  entityData.light.left;
            light.shadow.camera.right = entityData.light.right;
            light.shadow.camera.top = entityData.light.top;
            light.shadow.camera.bottom =  entityData.light.bottom;
            light.shadow.camera.updateProjectionMatrix();
        }

        const position = entityData.light.position;
        const target = entityData.light.target;
        light.position.set(position.x, position.y, position.z);
        light.target.position.set(target.x, target.y, target.z);

        em.addComponent(entityData.entity, new DirectionalLightComponent(light));
        em.addComponent(entityData.entity, new LightComponent(light));
    }
}

async function createModelEntity(entityData, renderer, em) {
    const loader = new GLTFLoader();
    if (entityData.textureCompression == "ktx2") {
        const ktx2Loader = new KTX2Loader();

        ktx2Loader.setTranscoderPath("/libs/basis/");
        ktx2Loader.detectSupport(renderer);
        ktx2Loader.setWorkerLimit(navigator.hardwareConcurrency || 4);
        loader.setKTX2Loader(ktx2Loader);
        loader.setMeshoptDecoder(MeshoptDecoder);
    }

    try {
        const gltf = await new Promise((resolve, reject) => {
            loader.load(entityData.src, resolve, undefined, reject);
        });

        const model = gltf.scene;
        model.position.set(entityData.position.x, entityData.position.y, entityData.position.z);
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = entityData.castShadow;
                child.receiveShadow = entityData.receiveShadow;
                child.material.side = THREE.FrontSide;
            }
        });


        em.addComponent(entityData.entity, new MeshComponent(model));
        em.addComponent(entityData.entity, new TransformComponent(entityData.position));
    } catch (error) {
        console.error('Error loading GLTF model:', error);
    }
}

export async function loadEntitiesFromJSON(jsonData, renderer, em) {
    jsonData.entities.forEach((entityData) => {
        if(entityData.ignored){
            return;
        }
        const entity = em.createEntity();
        if (entityData.type === "mesh") {
            createMeshEntity({ entity, ...entityData }, em);
        } else if (entityData.type === "light") {
            createLightEntity({ entity, ...entityData }, em);
        } else if (entityData.type === "model") {
            createModelEntity({ entity, ...entityData }, renderer, em);
        }
    });
}
