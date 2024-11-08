import Phaser from "../lib/phaser.js";
import { BATTLE_BACKGROUND_ASSET_KEYS } from "../assets/assets-keys.js";
import { SCENE_KEYS } from "./scene-keys.js";
import { HEROES } from "../assets/assets-keys.js";
import { BATTLE_ASSET_KEYS } from "../assets/assets-keys.js";
import { HEALTH_BAR_ASSET_KEYS } from "../assets/assets-keys.js";

export class BattleScene extends Phaser.Scene {
    constructor() {
        super(
            {
                key: SCENE_KEYS.BATTLE_SCENE,
            }
        );
    }

    create() {

        console.log(`[${BattleScene.name}]:create] invoked`);

        //create main background
        const background = this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.BRIDGE);
        background.setOrigin(0.5, 0.5); 

        background.x = this.cameras.main.width / 2;
        background.y = this.cameras.main.height / 2;

        const scaleX = this.cameras.main.width / background.width;
        const scaleY = this.cameras.main.height / background.height;
        const scale = Math.min(scaleX, scaleY);
        background.setScale(scale);

        //rend out the player and enemy heroes
        const hero = this.add.image(256, 316, HEROES.REAPER_ICE, 0);
        hero.setScale(0.5);
        const enemy = this.add.image(768, 144, HEROES.REAPER_FIRE, 0)
        enemy.flipX = true;
        enemy.setScale(0.35);
        enemy.setDepth(1);

        //render the player health bar
        const playerHeroName = this.add.text(
            30, 
            20, 
            HEROES.REAPER_ICE, 
            {
                color: '#ffffff',
                fontSize: '32px'
            }
        );
        this.add.container(556, 318, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0, 0).setScale(10),
            //change size of health bar background


            playerHeroName
        ]);

    }

}