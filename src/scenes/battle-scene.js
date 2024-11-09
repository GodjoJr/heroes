import Phaser from "../lib/phaser.js";
import { BATTLE_BACKGROUND_ASSET_KEYS } from "../assets/assets-keys.js";
import { SCENE_KEYS } from "./scene-keys.js";
import { HEROES } from "../assets/assets-keys.js";
import { BATTLE_ASSET_KEYS } from "../assets/assets-keys.js";
import { HEALTH_BAR_ASSET_KEYS } from "../assets/assets-keys.js";

const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'COMBATTRE',
    SWITCH: 'CHANGER',
    BAG: 'SAC',
    RUN: 'FUIR'
})

const battleUITextStyle= { color: '#000000', fontSize: '30px' }

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
        const hero = this.add.image(256, 296, HEROES.REAPER_ICE, 0);
        hero.setScale(0.45);
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
                color: '#4F4B47',
                fontSize: '28px'
            }
        );

        this.add.container(556, 308, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0, 0).setScale(1, 0.8),
            playerHeroName,
            this.#createHealth(34, 34),
            this.add.text(
                playerHeroName.width + 50,
                23,
                'L.1',
                {
                    color: '#1f7e05',
                    fontSize: '24px'
                }
            ),
            this.add.text(
                30,
                57,
                'HP',
                {
                    color: '#c46500',
                    fontSize: '22px',
                    fontStyle: 'italic'
                }
            ),
            this.add.text(
                448,
                82,
                '25/25',
                {
                    color: '#4F4B47',
                    fontSize: '14px',
                }
            ).setOrigin(1, 0)
        ]);

        //render the enemy health bar
        const enemyHeroName = this.add.text(
            30,
            20,
            HEROES.REAPER_FIRE,
            {
                color: '#4F4B47',
                fontSize: '28px'
            }
        );

        this.add.container(5, 5, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0, 0).setScale(1, 0.6),
            enemyHeroName,
            this.#createHealth(34, 34),
            this.add.text(
                enemyHeroName.width + 50,
                23,
                'L.1',
                {
                    color: '#1f7e05',
                    fontSize: '24px'
                }
            ),
            this.add.text(
                30,
                57,
                'HP',
                {
                    color: '#c46500',
                    fontSize: '22px',
                    fontStyle: 'italic'
                }
            )
        ]);

        //render the main info pane and sub info panes
        this.#createMainInfoPane();
        this.add.container(520, 448, [
            this.#createSubInfoPane(),
            this.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleUITextStyle),
            this.add.text(280, 22, BATTLE_MENU_OPTIONS.SWITCH, battleUITextStyle),
            this.add.text(55, 70, BATTLE_MENU_OPTIONS.BAG, battleUITextStyle),
            this.add.text(280, 70, BATTLE_MENU_OPTIONS.RUN, battleUITextStyle)
        ]);

        this.add.container(0, 448, [
            this.add.text(55, 22, 'Lame glace', battleUITextStyle),
            this.add.text(280, 22, '-', battleUITextStyle),
            this.add.text(55, 70, '-', battleUITextStyle),
            this.add.text(280, 70, '-', battleUITextStyle)
        ])

    }

    #createHealth(x, y) {
        const scaleY = 1;

        const leftCap = this.add
            .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);

        const middle = this.add.image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
        middle.displayWidth = 360;

        const rightCap = this.add
            .image(middle.x + middle.displayWidth, y, HEALTH_BAR_ASSET_KEYS.RIGHT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);

        return this.add.container(leftCap.x, y, [leftCap, middle, rightCap]);
    }

    #createMainInfoPane(){
        const padding = 4;
        const rectHeight = 124;
        this.add
        .rectangle(padding, this.scale.height - rectHeight - padding, this.scale.width - (padding * 2), rectHeight, 0xede4f3, 1)
        .setOrigin(0)
        .setStrokeStyle(8, 0x5D3A1A);
    }

    #createSubInfoPane(){
        const padding = 3;
        const rectHeight = 124;
        const rectWidth = 500;
        return this.add
        .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
        .setOrigin(0)
        .setStrokeStyle(6, 0x1E90FF);
    }
}