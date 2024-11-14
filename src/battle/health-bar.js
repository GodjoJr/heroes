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

    /** @type {Phaser.GameObjects.Image} */
    #leftCapShadow;

    /** @type {Phaser.GameObjects.Image} */
    #middleShadow;

    /** @type {Phaser.GameObjects.Image} */
    #rightCapShadow;

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
        this.#createHealthBarShadowImages(x, y);

        this.#setMeterPercentage(1);
    }

    get container() {
        return this.#healthBarContainer;
    }

    /**
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

    /**
    * @param {number} x the x position to place the health bar container
    * @param {number} y the y position to place the health bar container
    * @returns {void}
    */
    #createHealthBarShadowImages(x, y) {
        this.#leftCapShadow = this.#scene.add
            .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP_SHADOW)
            .setOrigin(0, 0.5)
            .setScale(1, this.#scaleY);

        this.#middleShadow = this.#scene.add
            .image(this.#leftCapShadow.x + this.#leftCapShadow.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE_SHADOW)
            .setOrigin(0, 0.5)
            .setScale(1, this.#scaleY);
        this.#middleShadow.displayWidth = this.#fullWidth;

        this.#rightCapShadow = this.#scene.add
            .image(this.#middleShadow.x + this.#middleShadow.displayWidth, y, HEALTH_BAR_ASSET_KEYS.RIGHT_CAP_SHADOW)
            .setOrigin(0, 0.5)
            .setScale(1, this.#scaleY);

        this.#healthBarContainer.add([this.#leftCapShadow, this.#middleShadow, this.#rightCapShadow]);
    }

    /**
     * @param {number} [percent=1] A number between 0 and 1 that is used for setting how filled the health bar is
     * @returns {void}
     */
    #setMeterPercentage(percent = 1) {
        const width = this.#fullWidth * percent;

        this.#middle.displayWidth = width;
        this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
    }


     /**
     * @param {number} [percent=1] A number between 0 and 1 that is used for setting how filled the health bar is
     * @param {object} [options] Options for the animation
     * @param {number} [options.duration=1000] The duration of the animation in milliseconds
     * @param {() => void} [options.callback] A callback function that is called when the animation is complete
     */
    setMeterPercentageAnimated(percent, options) {
        const width = this.#fullWidth * percent;

        this.#scene.tweens.add({
            targets: this.#middle,
            displayWidth: width,
            duration: options?.duration || 1000,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
                const isVisible = this.#middle.displayWidth > 0;
                this.#leftCap.visible = isVisible;
                this.#middle.visible = isVisible;
                this.#rightCap.visible = isVisible;
            },
            onComplete: options?.callback,
        })
    }

}