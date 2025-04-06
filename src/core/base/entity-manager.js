export class EntityManager {
    constructor() {
        this.nextId = 0;

        this.entityComponents = new Map();
        this.componentsByType = new Map();
    }

    createEntity() {
        const id = this.nextId++;
        this.entityComponents.set(id, new Map());
        return id;
    }

    addComponent(entity, component) {
        const type = component.type;
        if (!this.entityComponents.has(entity)) {
            this.entityComponents.set(entity, new Map());
        }

        this.entityComponents.get(entity).set(type, component);

        if (!this.componentsByType.has(type)) {
            this.componentsByType.set(type, new Map());
        }

        this.componentsByType.get(type).set(entity, component);
    }

    getComponent(entity, componentType) {
        return this.entityComponents.get(entity)?.get(componentType);
    }

    getEntitiesWithComponents(...componentTypes) {

        if (componentTypes.length === 0) {
            return [];
        }

        const sets = componentTypes.map(type => this.componentsByType.get(type));

        if (sets.some(set => !set)) {
            return [];
        }

        const entityIds = [...sets[0].keys()];

        return entityIds.filter(id =>
            sets.every(set => set.has(id))
        );
    }

}
