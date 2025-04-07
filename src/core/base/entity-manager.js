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
    
    getEntityWithComponent(componentType) {
        const components = this.componentsByType.get(componentType);
        if (!components) return null;

        const iterator = components.keys();
        const { value, done } = iterator.next();
        return done ? null : value;
    }

    getEntitiesWithComponents(...componentTypes) {
        const sets = componentTypes.map(type => this.componentsByType.get(type) || new Set());

        let result = new Set([...sets[0].keys()]);

        for (let i = 1; i < sets.length; i++) {
            result = new Set([...result].filter(id => sets[i].has(id)));
        }

        return [...result];
    }

}
