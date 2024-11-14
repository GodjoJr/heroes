import { BattleHero } from "./battle-hero.js";

/**
 * @type {import("../../types/typedef.js").Coordinate}
 */
const ENEMY_POSITION = Object.freeze({
    x: 767,
    y: 144
});

export class EnemyBattleHero extends BattleHero {
    
    /**
     * @param {import("../../types/typedef.js").BattleHeroConfig} config 
     */
    constructor(config) {
        super({...config, scaleHealthBarBackgroundImageByY: 0.6}, ENEMY_POSITION);
        this._phaserGameObject.setFlipX(true);
        this._phaserGameObject.setScale(0.35);
        
    }
}