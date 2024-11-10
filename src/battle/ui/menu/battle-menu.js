import { HEROES, UI_ASSET_KEYS } from "../../../assets/assets-keys.js";
import { DIRECTION } from "../../../common/direction.js";
import Phaser from "../../../lib/phaser.js";
import { exhaustiveGuard } from "../../../utils/guard.js";

/**
 * @typedef {keyof typeof BATTLE_MENU_OPTIONS} BattleMenuOptions
 */

/** @enum {BattleMenuOptions} */
const BATTLE_MENU_OPTIONS = Object.freeze({
    COMBATTRE: 'COMBATTRE',
    CHANGER: 'CHANGER',
    FUIR: 'FUIR',
    SAC: 'SAC',
})

//Battle text style
const battleUITextStyle = { color: '#000000', fontSize: '30px' }

//cursor position

const BATTLE_MENU_CURSOR_POSITIONS = Object.freeze({
    x: 41,
    y: 37
})



export class BattleMenu {

    /** @type {Phaser.Scene} */
    #scene;

    /** @type {Phaser.GameObjects.Container} */
    #mainBattleMenuPhaserContainerGameObject;

    /** @type {Phaser.GameObjects.Container} */
    #moveSelectionSubBattleMenuPhaserContainerGameObject;

    /** @type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine1;

    /** @type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine2;

    /** @type {Phaser.GameObjects.Image} */
    #mainBattleMenuCursorPhaserImageGameObject;

    /** @type {Phaser.GameObjects.Image} */
    #attackBattleMenurCursorPhaserImageGameObject;

    /** @type {BattleMenuOptions} */
    #selectedBattleMenuOptions;

    /**
     * Create the scene, the main battle menu and the hero attack sub menu
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        this.#scene = scene;
        this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.COMBATTRE;
        this.#createMainInfoPane();
        this.#createMainBattleMenu();
        this.#createHeroAttackSubMenu();
    }

    //show the main battle menu and text
    showMainBattleMenu() {
        this.#battleTextGameObjectLine1.setText('Qu\'est ce que');
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
        this.#battleTextGameObjectLine1.setAlpha(1);
        this.#battleTextGameObjectLine2.setAlpha(1);

        this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITIONS.x, BATTLE_MENU_CURSOR_POSITIONS.y);
    }

    //hide the main battle menu and text
    hideMainBattleMenu() {
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
        this.#battleTextGameObjectLine1.setAlpha(0);
        this.#battleTextGameObjectLine2.setAlpha(0);
    }

    //show the hero attack sub menu
    showHeroAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
    }

    //hide the hero attack sub menu
    hideHeroAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
    }

    /**
     * 
     * @param {import ('../../../common/direction.js').Direction | 'OK' | 'CANCEL'} input 
     */
    handlePlayerInput(input) {
        if (input === 'CANCEL') {
            this.hideHeroAttackSubMenu();
            this.showMainBattleMenu();
            return;
        }

        if (input === 'OK') {
            this.hideMainBattleMenu();
            this.showHeroAttackSubMenu();
            return;
        }

        this.#updateSelectedBattleMenuOptionFromInput(input);
        this.#moveMainBattleMenuCursor();

        console.log(input);
    }

    //create the main battle menu and text
    #createMainBattleMenu() {
        this.#battleTextGameObjectLine1 = this.#scene.add.text(25, 468, 'Qu\'est ce que', battleUITextStyle);
        this.#battleTextGameObjectLine2 = this.#scene.add.text(25, 508, `${HEROES.REAPER_ICE} veut faire ?`, battleUITextStyle);

        this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add.image(BATTLE_MENU_CURSOR_POSITIONS.x, BATTLE_MENU_CURSOR_POSITIONS.y, UI_ASSET_KEYS.CURSOR).setOrigin(0.5).setScale(0.7);
        this.#mainBattleMenuCursorPhaserImageGameObject.flipX = true;

        this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(520, 448, [
            this.#createSubInfoPane(),
            this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.COMBATTRE, battleUITextStyle),
            this.#scene.add.text(280, 22, BATTLE_MENU_OPTIONS.CHANGER, battleUITextStyle),
            this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.SAC, battleUITextStyle),
            this.#scene.add.text(280, 70, BATTLE_MENU_OPTIONS.FUIR, battleUITextStyle),

            this.#mainBattleMenuCursorPhaserImageGameObject

        ]);


        this.hideMainBattleMenu();
    }


    //create the hero attack sub menu
    #createHeroAttackSubMenu() {
        this.#attackBattleMenurCursorPhaserImageGameObject = this.#scene.add.image(40, 37, UI_ASSET_KEYS.CURSOR).setOrigin(0.5).setScale(0.7);
        this.#attackBattleMenurCursorPhaserImageGameObject.flipX = true;

        this.#moveSelectionSubBattleMenuPhaserContainerGameObject = this.#scene.add.container(0, 448, [
            this.#scene.add.text(55, 22, 'Lame glace', battleUITextStyle),
            this.#scene.add.text(280, 22, 'Givre', battleUITextStyle),
            this.#scene.add.text(55, 70, '-', battleUITextStyle),
            this.#scene.add.text(280, 70, '-', battleUITextStyle),

            this.#attackBattleMenurCursorPhaserImageGameObject
        ]);

        this.hideHeroAttackSubMenu();
    }

    
    //create the main info pane
    #createMainInfoPane() {
        const padding = 4;
        const rectHeight = 124;
        this.#scene.add
            .rectangle(padding, this.#scene.scale.height - rectHeight - padding, this.#scene.scale.width - (padding * 2), rectHeight, 0xede4f3, 1)
            .setOrigin(0)
            .setStrokeStyle(8, 0x5D3A1A);
    }


    //create the sub info pane
    #createSubInfoPane() {
        const padding = 3;
        const rectHeight = 124;
        const rectWidth = 500;
        return this.#scene.add
            .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
            .setOrigin(0)
            .setStrokeStyle(6, 0x1E90FF);
    }

    /**
     * 
     * @param {import ('../../../common/direction.js').Direction} direction 
     */
    #updateSelectedBattleMenuOptionFromInput(direction) {
        if (this.#selectedBattleMenuOptions === BATTLE_MENU_OPTIONS.COMBATTRE) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.CHANGER;
                    return;
                case DIRECTION.LEFT:
                    return;
                case DIRECTION.DOWN:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.SAC;
                    return;
                case DIRECTION.UP:
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhaustiveGuard(direction);
            }
            return;
        }

        if (this.#selectedBattleMenuOptions === BATTLE_MENU_OPTIONS.CHANGER) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    return;
                case DIRECTION.LEFT:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.COMBATTRE;
                    return;
                case DIRECTION.DOWN:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.FUIR;
                    return;
                case DIRECTION.UP:
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhaustiveGuard(direction);
            }
            return;
        }

        if (this.#selectedBattleMenuOptions === BATTLE_MENU_OPTIONS.SAC) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.FUIR;
                    return;
                case DIRECTION.LEFT:
                    return;
                case DIRECTION.DOWN:
                    return;
                case DIRECTION.UP:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.COMBATTRE;
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhaustiveGuard(direction);
            }
            return;
        }

        if (this.#selectedBattleMenuOptions === BATTLE_MENU_OPTIONS.FUIR) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    return;
                case DIRECTION.LEFT:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.SAC;
                    return;
                case DIRECTION.DOWN:
                    return;
                case DIRECTION.UP:
                    this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.CHANGER;
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                   exhaustiveGuard(direction);
            }
            return;
        }

        exhaustiveGuard(this.#selectedBattleMenuOptions);
    }

    #moveMainBattleMenuCursor(){
        switch(this.#selectedBattleMenuOptions) {
            case BATTLE_MENU_OPTIONS.COMBATTRE:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITIONS.x, BATTLE_MENU_CURSOR_POSITIONS.y);
                return;
            case BATTLE_MENU_OPTIONS.CHANGER:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(265, BATTLE_MENU_CURSOR_POSITIONS.y);
                return;
            case BATTLE_MENU_OPTIONS.SAC:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITIONS.x, 86);
                return;
            case BATTLE_MENU_OPTIONS.FUIR:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(265, 86);
                return;
            default:
                exhaustiveGuard(this.#selectedBattleMenuOptions);
                return;
        }
    }
}