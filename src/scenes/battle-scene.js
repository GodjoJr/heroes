import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";
import { HEROES } from "../assets/assets-keys.js";
import { BATTLE_ASSET_KEYS } from "../assets/assets-keys.js";
import { BattleMenu } from "../battle/ui/menu/battle-menu.js";
import { DIRECTION } from "../common/direction.js";
import { Background } from "../battle/background.js";
import { HealthBar } from "../battle/health-bar.js";
import { BattleHero } from "../battle/heroes/battle-hero.js";
import { EnemyBattleHero } from "../battle/heroes/enemy-battle-hero.js";
import { PlayerBattleHero } from "../battle/heroes/player-battle-hero.js";


export class BattleScene extends Phaser.Scene {

    /** @type {BattleMenu} */
    #battleMenu;

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    #cursorKeys;

    /** @type {EnemyBattleHero} */
    #activeEnemyHero

    /** @type {PlayerBattleHero} */
    #activePlayerHero;

    constructor() {
        super(
            {
                key: SCENE_KEYS.BATTLE_SCENE,
            }
        );
    }

    create() {
        console.log(`[${BattleScene.name}]:create] invoked`);

        const background = new Background(this);
        background.showCastle();

        // Player hero
        this.#activePlayerHero = new PlayerBattleHero(
            {
                scene: this,
                heroDetails: {
                    name: HEROES.REAPER_ICE,
                    assetKey: HEROES.REAPER_ICE,
                    assetFrame: 0,
                    currentHp: 25,
                    maxHp: 25,
                    attackIds: [],
                    baseAttack: 5,
                    currentLevel: 5,
                }
            },
        );

        // Enemy hero
        this.#activeEnemyHero = new EnemyBattleHero(
            {
                scene: this,
                heroDetails: {
                    name: HEROES.REAPER_FIRE,
                    assetKey: HEROES.REAPER_FIRE,
                    assetFrame: 0,
                    currentHp: 25,
                    maxHp: 25,
                    attackIds: [],
                    baseAttack: 5,
                    currentLevel: 5,
                }
            },
        );


        //render the main info pane and sub info panes
        this.#battleMenu = new BattleMenu(this);
        this.#battleMenu.showMainBattleMenu();

        this.#cursorKeys = this.input.keyboard.createCursorKeys();

        this.#activeEnemyHero.takeDamage(20, () => {
            this.#activePlayerHero.takeDamage(15);
        })

    }

    update() {
        const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space);
        if (wasSpaceKeyPressed) {
            this.#battleMenu.handlePlayerInput('OK');

            //check if the player selected an attack, and update display text
            if (this.#battleMenu.selectedAttack === undefined) {
                return;
            }
            console.log('Attaque choisie : ' + this.#battleMenu.selectedAttack);
            this.#battleMenu.hideHeroAttackSubMenu();
            this.#battleMenu.updateInfoPaneMessagesAndWaitForInput(
                [`${HEROES.REAPER_ICE} utilise ${this.#battleMenu.selectedAttack}...`],
                () => {
                    this.#battleMenu.showMainBattleMenu();
                }
            );
        }

        if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift)) {
            this.#battleMenu.handlePlayerInput('CANCEL');
            return;
        }

        /** @type {import('../common/direction.js').Direction} */
        let selectedDirection = DIRECTION.NONE;
        if ((this.#cursorKeys.up.isDown)) {
            selectedDirection = DIRECTION.UP;
        } else if (this.#cursorKeys.down.isDown) {
            selectedDirection = DIRECTION.DOWN;
        } else if (this.#cursorKeys.left.isDown) {
            selectedDirection = DIRECTION.LEFT;
        } else if (this.#cursorKeys.right.isDown) {
            selectedDirection = DIRECTION.RIGHT;
        }

        if (selectedDirection !== DIRECTION.NONE) {
            this.#battleMenu.handlePlayerInput(selectedDirection);
        }
    }
}