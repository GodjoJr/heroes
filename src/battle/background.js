import Phaser from "../lib/phaser.js";
import { BATTLE_BACKGROUND_ASSET_KEYS } from "../assets/assets-keys.js";

export class Background {
    /** @type {Phaser.Scene} */
    #scene;

    /** @type {Phaser.GameObjects.Image} */
    #backgroundGameObject;

    /**
     * Creates a new Background
     * @param {Phaser.Scene} scene - the Phaser.Scene that this Background is part of
     */
    constructor(scene) {
        this.#scene = scene;
        this.#createBackground();
    }

    create() {
        
    }

    #createBackground() {
        this.#backgroundGameObject = this.#scene.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.CASTLE);
        this.#backgroundGameObject.setOrigin(0.5, 0.5);

        this.#backgroundGameObject.x = this.#scene.cameras.main.width / 2;
        this.#backgroundGameObject.y = this.#scene.cameras.main.height / 2;

        const scaleX = this.#scene.cameras.main.width / this.#backgroundGameObject.width;
        const scaleY = this.#scene.cameras.main.height / this.#backgroundGameObject.height;
        const scale = Math.min(scaleX, scaleY);
        this.#backgroundGameObject.setScale(scale);
        this.#backgroundGameObject.setAlpha(0);
    }

    showCastle() {
        this.#backgroundGameObject.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.CASTLE).setAlpha(1);
    }

    showBamboo() {
        this.#backgroundGameObject.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.BAMBOO).setAlpha(1);
    }
}