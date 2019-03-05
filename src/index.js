
import * as PIXI from 'pixi.js';
import TiledMap from 'tiled-to-pixi';

import Character from './lib/character';
import Game from './lib/game';
import './index.sass';

const app = new PIXI.Application({ width: 800, height: 600 });
const root = document.querySelector('#root');
const loader = PIXI.loader;

let game;
let delta = 0
let timestep = 1000 / 60
let lastFrame = Date.now()

root.appendChild(app.view)

app.stop()
loader
    .add('character', 'gfx/character.png')
    .add('objects', 'gfx/objects.png')
    .add('TestMap', 'maps/testmap.tmx')
    .add('gfx/overworld.png')
    .use(TiledMap.middleware)
    .load(function (_loader, resources) {

        let map = new TiledMap('TestMap')
        let character = new Character(resources.character.texture, 64, 32, map)

        game = new Game(character)
        app.stage.addChild(map)
        app.stage.addChild(character.getAnimation())
        app.start()

        setInterval(loop, timestep)
    })

function updateDelta() {
    let timestamp = Date.now()
    delta = timestamp - lastFrame
    lastFrame = timestamp
}

function loop() {
    updateDelta()
    while (delta >= timestep) {
        game.update()
        delta -= timestep
    }
}
