import { TransformComponent } from "../components/transform-component";
import { MovementComponent } from "../components/movement-component";

export class MovementSystem {
    update(em, deltaTime) {
        const entities = em.getEntitiesWithComponents(TransformComponent, MovementComponent);

        for (const entity of entities) {
         
        }
    }
}
