import Phaser from "../lib/phaser.js";
import { HEALTH_BAR_ASSET_KEYS } from "../assets/assets-keys.js";

export class HealthBar {

    /** @type {Phaser.Scene} */
    #scene;

    /** @type {Phaser.GameObjects.Container} */
    #healthBarContainer;

    /** @type {number} */
    #fullWidth;

    /** @type {number} */
    #scaleY;

    /** @type {Phaser.GameObjects.Image} */
    #leftCap;
    
    /** @type {Phaser.GameObjects.Image} */
    #middle;

    /** @type {Phaser.GameObjects.Image} */
    #rightCap;

    /**
     * Constructs a HealthBar instance.
     * @param {Phaser.Scene} scene - The Phaser 3 scene this health bar belongs to.
     * @param {number} x - The x-coordinate of the health bar's position.
     * @param {number} y - The y-coordinate of the health bar's position.
     */
    constructor(scene, x, y) {
        this.#scene = scene;

        this.#fullWidth = 360;
        this.#scaleY = 1;

        this.#healthBarContainer = this.#scene.add.container(x, y, []);
        this.#createHealthBarImages(x, y);

        this.#setMeterPercentage(1);
    }

    get container() {
        return this.#healthBarContainer;
    }

    /**
    * 
    * @param {number} x the x position to place the health bar container
    * @param {number} y the y position to place the health bar container
    * @returns {void}
    */
    #createHealthBarImages(x, y) {

        this.#leftCap = this.#scene.add
            .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, this.#scaleY);

        this.#middle = this.#scene.add.image(this.#leftCap.x + this.#leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
            .setOrigin(0, 0.5)
            .setScale(1, this.#scaleY);

        this.#rightCap = this.#scene.add
            .image(this.#middle.x + this.#middle.displayWidth, y, HEALTH_BAR_ASSET_KEYS.RIGHT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, this.#scaleY);

        this.#healthBarContainer.add([this.#leftCap, this.#middle, this.#rightCap]);
    }

    #setMeterPercentage(percent = 1) {
        const width = this.#fullWidth * percent;
        this.#middle.displayWidth = width;
        this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
    }

}