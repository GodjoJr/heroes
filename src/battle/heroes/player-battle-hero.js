import { BattleHero } from "./battle-hero.js";
import { BATTLE_UI_TEXT_STYLE } from "../ui/menu/battle-menu-config.js";

/**
 * @type {import("../../types/typedef.js").Coordinate}
 */
const PLAYER_POSITION = Object.freeze({
    x: 256,
    y: 296
});

export class PlayerBattleHero extends BattleHero {
    /** @type {Phaser.GameObjects.Text} */
    #healthBarTextGameObject

    /**
     * @param {import("../../types/typedef.js").BattleHeroConfig} config 
     */
    constructor(config) {
        super({ ...config, scaleHealthBarBackgroundImageByY: 0.8 }, PLAYER_POSITION);
        this._phaserGameObject.setScale(0.45);
        this._phaserHealthBarGameContainer.setPosition(556, 308);
        this.#addHealthBarComponents();
    }

    #setHealthBarText() {
        this.#healthBarTextGameObject.setText(`${this._currentHealth}/${this._maxHealth}`);
    }

    #addHealthBarComponents() {
        this.#healthBarTextGameObject = this._scene.add
            .text(448, 82, '', { color: '#4F4B47', fontSize: '14px', })
            .setOrigin(1, 0)
        this.#setHealthBarText();
        this._phaserHealthBarGameContainer.add(this.#healthBarTextGameObject);
    }

    /**
     * 
     * @param {number} damage 
     * @param {() => void} [callback]
     */
    takeDamage(damage, callback) {
        super.takeDamage(damage, callback);
        this.#setHealthBarText();
    }
}
