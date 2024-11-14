import { HealthBar } from "../health-bar.js";
import { BATTLE_ASSET_KEYS } from "../../assets/assets-keys.js";


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

    /** @protected @type {Phaser.GameObjects.Container} */
    _phaserHealthBarGameContainer;

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
        this._phaserGameObject = this._scene.add.image(
            position.x, position.y,
            this._heroDetails.assetKey,
            this._heroDetails.assetFrame || 0
        );

        this.#createHealthBarComponents(config.scaleHealthBarBackgroundImageByY);
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

    /** @type {number} */
    get Level() {
        return this._heroDetails.currentLevel;
    }

    #createHealthBarComponents(scaleHealthBarBackgroundImageByY = 1) {
        this._healthBar = new HealthBar(this._scene, 34, 34);

        const heroNameGameText = this._scene.add.text(
            30,
            20,
            this.name,
            {
                color: '#4F4B47',
                fontSize: '28px'
            }
        );

        const HealthBarBackgroundImage = this._scene.add
            .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
            .setOrigin(0, 0)
            .setScale(1, scaleHealthBarBackgroundImageByY);

        const heroHealthBarLevelText = this._scene.add.text(heroNameGameText.width + 50, 18, `Lv.${this.Level}`, { color: '#1f7e05', fontSize: '24px' });

        const heroHpText = this._scene.add.text(30, 57, 'HP', { color: '#c46500', fontSize: '22px', fontStyle: 'italic' })

        this._phaserHealthBarGameContainer = this._scene.add.container(5, 5, [
            HealthBarBackgroundImage,
            heroNameGameText,
            this._healthBar.container,
            heroHealthBarLevelText,
            heroHpText,
        ]);

    }

    /**
     * 
     * @param {number} damage 
     * @param {() => void} [callback]
     */
    takeDamage(damage, callback) {
        this._currentHealth -= damage;
        if (this._currentHealth <= 0) {
            this._currentHealth = 0;
        }

        this._healthBar.setMeterPercentageAnimated(this._currentHealth / this._maxHealth, { callback });
    }
}