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
import { StateMachine } from "../utils/state-machine.js";

const BATTLE_STATES = Object.freeze({
    INTRO: 'INTRO',
    PRE_BATTLE_INFO: 'PRE_BATTLE_INFO',
    BRING_OUT_HERO: 'BRING_OUT_HERO',
    PLAYER_INPUT: 'PLAYER_INPUT',
    ENEMY_INPUT: 'ENEMY_INPUT',
    BATTLE: 'BATTLE',
    POST_ATTACK_CHECK: 'POST_ATTACK_CHECK',
    FINISHED: 'FINISHED',
    FLEE_ATTEMPT: 'FLEE_ATTEMPT',
})


export class BattleScene extends Phaser.Scene {

    /** @type {BattleMenu} */
    #battleMenu;

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    #cursorKeys;

    /** @type {EnemyBattleHero} */
    #activeEnemyHero

    /** @type {PlayerBattleHero} */
    #activePlayerHero;

    /** @type {StateMachine} */
    #battleStateMachine;

    /** @type {number} */
    #activePlayerAttackIndex;

    constructor() {
        super(
            {
                key: SCENE_KEYS.BATTLE_SCENE,
            }
        );
    }

    init() {
        this.#activePlayerAttackIndex = -1;
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
                    attackIds: [2],
                    baseAttack: 25,
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
                    attackIds: [1],
                    baseAttack: 5,
                    currentLevel: 5,
                }
            },
        );


        //render the main info pane and sub info panes
        this.#battleMenu = new BattleMenu(this, this.#activePlayerHero);

        this.#createBattleStateMachine();

        this.#cursorKeys = this.input.keyboard.createCursorKeys();

    }

    update() {
        const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space);
        if (wasSpaceKeyPressed) {
            this.#battleMenu.handlePlayerInput('OK');

            //check if the player selected an attack, and update display text
            if (this.#battleMenu.selectedAttack === undefined) {
                return;
            }
            
            this.#activePlayerAttackIndex = this.#battleMenu.selectedAttack;
            if(this.#activePlayerAttackIndex === undefined) {
                return;
            }
            
            console.log('Attaque choisie : ' + this.#battleMenu.selectedAttack);


            this.#battleMenu.hideHeroAttackSubMenu();
            this.#handleBattleSequence();
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

    #createBattleStateMachine() {
        this.#battleStateMachine = new StateMachine('battle', this);

        //INTRO STATE
        this.#battleStateMachine.addState({
            name: BATTLE_STATES.INTRO,
            onEnter: () => {
                // wait for any scene setup and transitions to complete
                this.time.delayedCall(500, () => {
                    this.#battleStateMachine.setState(BATTLE_STATES.PRE_BATTLE_INFO);
                })
            }
        });

        //PRE BATTLE INFO STATE 
        this.#battleStateMachine.addState({
            name: BATTLE_STATES.PRE_BATTLE_INFO,
            onEnter: () => {
                //wait for enemy hero to appear on the screen and notify the player about the wild enemy
                this.#battleMenu.updateInfoPaneMessagesAndWaitForInput([`Un ${this.#activeEnemyHero.name} apparait !`],
                    () => {
                        //wait to text animation to complete and move tho the next state
                        this.time.delayedCall(500, () => {
                            this.#battleStateMachine.setState(BATTLE_STATES.BRING_OUT_HERO);
                        })
                    }
                )
            }
        });


        //BRING OUT HERO STATE
        this.#battleStateMachine.addState({
            name: BATTLE_STATES.BRING_OUT_HERO,
            onEnter: () => {
                //wait for the player hero to appear on the screen and notify the player about the hero
                this.#battleMenu.updateInfoPaneMessagesAndWaitForInput([`A toi de jouer ${this.#activePlayerHero.name} !`],
                    () => {
                        //wait to text animation to complete and move tho the next state
                        this.time.delayedCall(500, () => {
                            this.#battleStateMachine.setState(BATTLE_STATES.PLAYER_INPUT);
                        })
                    })
            },
        });

        //PLAYER INPUT STATE
        this.#battleStateMachine.addState({
            name: BATTLE_STATES.PLAYER_INPUT,
            onEnter: () => {
                this.#battleMenu.showMainBattleMenu();
            },
            //TO CONTINUE
        });

        this.#battleStateMachine.addState({
            name: BATTLE_STATES.ENEMY_INPUT,
        });

        this.#battleStateMachine.addState({
            name: BATTLE_STATES.BATTLE,
        });

        this.#battleStateMachine.addState({
            name: BATTLE_STATES.FINISHED,
        });

        this.#battleStateMachine.addState({
            name: BATTLE_STATES.FLEE_ATTEMPT,
        });

        //start the state machine
        this.#battleStateMachine.setState('INTRO');
    }

    #handleBattleSequence() {
        // general battle flow
        // show attack used, brief pause
        // then play attack animation, brief pause
        // then play damage animation, brief pause
        // then play health bar animation, bried pause
        // then repeat the steps above for the other hero

        this.#playerAttack();
    }

    #playerAttack() {
        this.#battleMenu.updateInfoPaneMessagesAndWaitForInput(
            [`${this.#activePlayerHero.name} utilise ${this.#activePlayerHero.attacks[this.#activePlayerAttackIndex].name} !`],
            () => {
                this.time.delayedCall(500, () => {
                    this.#activeEnemyHero.takeDamage(this.#activePlayerHero.baseAttack, () => {
                        this.#enemyAttack();
                    });
                })
            }
        )
    }

    #enemyAttack() {
        if(this.#activeEnemyHero.isFainted){
            this.#postBattleSequenceCheck();
            return;
        }

        this.#battleMenu.updateInfoPaneMessagesAndWaitForInput(
            [`${this.#activePlayerHero.name} utilise ${this.#activeEnemyHero.attacks[0].name} !`],
            () => {
                this.time.delayedCall(500, () => {
                    this.#activePlayerHero.takeDamage(this.#activeEnemyHero.baseAttack, () => {
                        this.#postBattleSequenceCheck();
                    });
                })
            }
        )
    }

    #postBattleSequenceCheck() {
        if (this.#activeEnemyHero.isFainted){
            this.#battleMenu.updateInfoPaneMessagesAndWaitForInput(
                [`${this.#activeEnemyHero.name} ennemi est K.O.`, ` ${this.#activePlayerHero.name} gagne de l'experience !`],
                () => {
                  this.#transitionToNextScene(); 
                }
            );
            return;
        }

        if (this.#activePlayerHero.isFainted){
            this.#battleMenu.updateInfoPaneMessagesAndWaitForInput(
                [`${this.#activePlayerHero.name} est K.O.`, `Vous n'avez plus de heros en vie, vous fuiez !`],
                () => {
                  this.#transitionToNextScene(); 
                }
            );
            return;
        }

        this.#battleMenu.showMainBattleMenu();
    }

    #transitionToNextScene() {
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start(SCENE_KEYS.BATTLE_SCENE);
        })
    }
}