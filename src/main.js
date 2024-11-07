import Phaser from './lib/phaser.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import { PreloadScene } from './scenes/preload-scene.js';


const game = new Phaser.Game({
    type: Phaser.CANVAS,
    pixelArt: false,
    scale: {
        width: 1024,
        height: 576,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'game-container',
    backgroundColor: '#000000'
});

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);