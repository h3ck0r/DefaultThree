import { Engine } from './core/engine.js';

const engine = new Engine();
window.engine = engine;

async function main() {
    await engine.init();
}

main();
