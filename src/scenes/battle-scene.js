import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";
import { HEROES } from "../assets/assets-keys.js";
import { BATTLE_ASSET_KEYS } from "../assets/assets-keys.js";
import { BattleMenu } from "../battle/ui/menu/battle-menu.js";
import { DIRECTION } from "../common/direction.js";
import { Background } from "../battle/background.js";
import { HealthBar } from "../battle/health-bar.js";



export class BattleScene extends Phaser.Scene {

    /** @type {BattleMenu} */
    #battleMenu;

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    #cursorKeys;

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

        //rend out the player and enemy heroes
        const hero = this.add.image(256, 296, HEROES.REAPER_ICE, 0);
        hero.setScale(0.45);
        const enemy = this.add.image(768, 144, HEROES.REAPER_FIRE, 0)
        enemy.flipX = true;
        enemy.setScale(0.35);
        enemy.setDepth(1);

        //render the player health bar
        const playerHealthBar = new HealthBar(this, 34, 34);
        const playerHeroName = this.add.text(
            30,
            20,
            HEROES.REAPER_ICE,
            {
                color: '#4F4B47',
                fontSize: '28px'
            }
        );

        //render the player health bar
        this.add.container(556, 308, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0, 0).setScale(1, 0.8),
            playerHeroName,
            playerHealthBar.container,
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
        const enemyHealthBar = new HealthBar(this, 34, 34);
        const enemyHeroName = this.add.text(
            30,
            20,
            HEROES.REAPER_FIRE,
            {
                color: '#4F4B47',
                fontSize: '28px'
            }
        );

        //render the enemy health bar
        this.add.container(5, 5, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0, 0).setScale(1, 0.6),
            enemyHeroName,
            enemyHealthBar.container,
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
        this.#battleMenu = new BattleMenu(this);
        this.#battleMenu.showMainBattleMenu();

        this.#cursorKeys = this.input.keyboard.createCursorKeys();

        playerHealthBar.setMeterPercentageAnimated(0.5,
            {
                duration: 3000,
                callback: () => {
                    console.log('animation complete');
                }
            });
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