import { HealthBar } from "../health-bar.js";

/**
 * @typedef BattleHeroConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Hero} heroDetails
 */

/**
 * @typedef Hero
 * @type {Object}
 * @property {string} name
 * @property {string} assetKey
 * @property {number} [assetFrame = 0]
 * @property {number} maxHp
 * @property {number} currentHp
 * @property {number} baseAttack
 * @property {string[]} attackIds
 * 
 */

/**
 * @typedef Coordinate
 * @type {Object}
 * @property {number} x
 * @property {number} y
 */


export class BattleHero {

    /** @protected @type {Phaser.Scene} */
    _scene;

    /** @protected @type {Hero} */
    _heroDetails;

    /** @protected @type {HealthBar} */
    _healthBar;

    /** @protected @type {Phaser.GameObjects.Image} */
    _phaserGameObject;

    /**
     * Constructor for BattleHero.
     * @param {BattleHeroConfig} config 
     * @param {Coordinate} position
     */
    constructor(config, position) {
        this._scene = config.scene;
        this._heroDetails = config.heroDetails;

        this._healthBar = new HealthBar(this._scene, 34, 34);

        this._scene.add.image(
            position.x, position.y,
            this._heroDetails.assetKey,
            this._heroDetails.assetFrame || 0
        )
    }
}