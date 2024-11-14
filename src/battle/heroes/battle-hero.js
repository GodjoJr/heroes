import { HealthBar } from "../health-bar.js";


export class BattleHero {

    /** @protected @type {Phaser.Scene} */
    _scene;

    /** @protected @type {import("../../types/typedef.js").Hero} */
    _heroDetails;

    /** @protected @type {HealthBar} */
    _healthBar;

    /** @protected @type {Phaser.GameObjects.Image} */
    _phaserGameObject;

    /** @protected @type {number} */
    _currentHealth;

    /** @protected @type {number} */
    _maxHealth;

    /** @protected @type {import("../../types/typedef.js").Attack[]} */
    _heroAttacks;

    /**
     * Constructor for BattleHero.
     * @param {import("../../types/typedef.js").BattleHeroConfig} config 
     * @param {import("../../types/typedef.js").Coordinate} position
     */
    constructor(config, position) {
        this._scene = config.scene;

        //store the hero details
        this._heroDetails = config.heroDetails;
        this._currentHealth = this._heroDetails.currentHp;
        this._maxHealth = this._heroDetails.maxHp;
        this._heroAttacks = [];


        //render the health bar
        this._healthBar = new HealthBar(this._scene, 34, 34);
        this._scene.add.image(
            position.x, position.y,
            this._heroDetails.assetKey,
            this._heroDetails.assetFrame || 0
        )
    }

    /** @type {boolean} */
    get isFainted() {
        return this._currentHealth <= 0;
    }

    /** @type {string} */
    get name() {
        return this._heroDetails.name;
    }

    /** @type {import ("../../types/typedef.js").Attack[]} */
    get attacks() {
        return [...this._heroAttacks];
    }

    /** @type {number} */
    get baseAttack() {
        return this._heroDetails.baseAttack;
    }

    /**
     * 
     * @param {number} damage 
     * @param {() => void} [callback]
     */
    takeDamage(damage, callback) {
        this._currentHealth -= damage;
        if(this._currentHealth <= 0) {
            this._currentHealth = 0;
        }

        this._healthBar.setMeterPercentageAnimated(this._currentHealth / this._maxHealth, {callback});
    }
}