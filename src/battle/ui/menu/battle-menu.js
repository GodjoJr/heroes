import Phaser from "../../../lib/phaser.js";
import { HEROES, UI_ASSET_KEYS } from "../../../assets/assets-keys.js";
import { DIRECTION } from "../../../common/direction.js";
import { exhaustiveGuard } from "../../../utils/guard.js";
import { BATTLE_UI_TEXT_STYLE } from "./battle-menu-config.js";
import { ATTACK_MOVE_OPTIONS } from "./battle-menu-options.js";
import { BATTLE_MENU_OPTIONS } from "./battle-menu-options.js";
import { ACTIVE_BATTLE_MENU } from "./battle-menu-options.js";

//cursor position
const BATTLE_MENU_CURSOR_POSITIONS = Object.freeze({
    x: 41,
    y: 37
})

const ATTACK_MENU_CURSOR_POSITIONS = Object.freeze({
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

    /** @type {import ('./battle-menu-options.js').BattleMenuOptions} */
    #selectedBattleMenuOptions;

    /** @type {import ('./battle-menu-options.js').AttackMoveOptions} */
    #selectedAttackMoveOptions;

    /** @type {import ('./battle-menu-options.js').ActiveBattleMenu} */
    #activeBattleMenu;

    /**
     * Create the scene
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        this.#scene = scene;
        this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
        this.#selectedBattleMenuOptions = BATTLE_MENU_OPTIONS.COMBATTRE;
        this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_1;
        this.#createMainInfoPane();
        this.#createMainBattleMenu();
        this.#createHeroAttackSubMenu();
    }

    //show the main battle menu and text
    showMainBattleMenu() {
        this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
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
        this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT;
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

        this.#updateSelectedMoveMenuOptionFromInput(input);
        this.#moveSelectBattleMenuCursor();

        console.log(input);
    }

    //create the main battle menu and text
    #createMainBattleMenu() {
        this.#battleTextGameObjectLine1 = this.#scene.add.text(25, 468, 'Qu\'est ce que', BATTLE_UI_TEXT_STYLE);
        this.#battleTextGameObjectLine2 = this.#scene.add.text(25, 508, `${HEROES.REAPER_ICE} veut faire ?`, BATTLE_UI_TEXT_STYLE);

        this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add.image(BATTLE_MENU_CURSOR_POSITIONS.x, BATTLE_MENU_CURSOR_POSITIONS.y, UI_ASSET_KEYS.CURSOR).setOrigin(0.5).setScale(0.7);
        this.#mainBattleMenuCursorPhaserImageGameObject.flipX = true;

        this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(520, 448, [
            this.#createSubInfoPane(),
            this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.COMBATTRE, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(280, 22, BATTLE_MENU_OPTIONS.CHANGER, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.SAC, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(280, 70, BATTLE_MENU_OPTIONS.FUIR, BATTLE_UI_TEXT_STYLE),

            this.#mainBattleMenuCursorPhaserImageGameObject

        ]);


        this.hideMainBattleMenu();
    }


    //create the hero attack sub menu
    #createHeroAttackSubMenu() {
        this.#attackBattleMenurCursorPhaserImageGameObject = this.#scene.add.image(40, 37, UI_ASSET_KEYS.CURSOR).setOrigin(0.5).setScale(0.7);
        this.#attackBattleMenurCursorPhaserImageGameObject.flipX = true;

        this.#moveSelectionSubBattleMenuPhaserContainerGameObject = this.#scene.add.container(0, 448, [
            this.#scene.add.text(55, 22, 'Lame glace', BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(280, 22, 'Givre', BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(55, 70, '-', BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(280, 70, '-', BATTLE_UI_TEXT_STYLE),

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
        if(this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
            return;
        }

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

    #moveMainBattleMenuCursor() {

        if(this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN){
            return;
        }

        switch (this.#selectedBattleMenuOptions) {
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

    /**
     * Cursor movement on attack menu
     * @param {import ('../../../common/direction.js').Direction} direction 
     */
    #updateSelectedMoveMenuOptionFromInput(direction) {

        if(this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT){
            return;
        }

        if (this.#selectedAttackMoveOptions === ATTACK_MOVE_OPTIONS.MOVE_1) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_2;
                    return;
                case DIRECTION.LEFT:
                    return;
                case DIRECTION.DOWN:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_3;
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

        if (this.#selectedAttackMoveOptions === ATTACK_MOVE_OPTIONS.MOVE_2) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    return;
                case DIRECTION.LEFT:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_1;
                    return;
                case DIRECTION.DOWN:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_4;
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

        if (this.#selectedAttackMoveOptions === ATTACK_MOVE_OPTIONS.MOVE_3) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_4;
                    return;
                case DIRECTION.LEFT:
                    return;
                case DIRECTION.DOWN:
                    return;
                case DIRECTION.UP:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_1;
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhaustiveGuard(direction);
            }
            return;
        }

        if (this.#selectedAttackMoveOptions === ATTACK_MOVE_OPTIONS.MOVE_4) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    return;
                case DIRECTION.LEFT:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_3;
                    return;
                case DIRECTION.DOWN:
                    return;
                case DIRECTION.UP:
                    this.#selectedAttackMoveOptions = ATTACK_MOVE_OPTIONS.MOVE_2;
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhaustiveGuard(direction);
            }
            return;
        }

        exhaustiveGuard(this.#selectedAttackMoveOptions);
    }

    #moveSelectBattleMenuCursor() {

        if(this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT){
            return;
        }

        switch (this.#selectedAttackMoveOptions) {
            case ATTACK_MOVE_OPTIONS.MOVE_1:
                this.#attackBattleMenurCursorPhaserImageGameObject.setPosition(ATTACK_MENU_CURSOR_POSITIONS.x, ATTACK_MENU_CURSOR_POSITIONS.y);
                return;
            case ATTACK_MOVE_OPTIONS.MOVE_2:
                this.#attackBattleMenurCursorPhaserImageGameObject.setPosition(265, ATTACK_MENU_CURSOR_POSITIONS.y);
                return;
                case ATTACK_MOVE_OPTIONS.MOVE_3:
                    this.#attackBattleMenurCursorPhaserImageGameObject.setPosition(ATTACK_MENU_CURSOR_POSITIONS.x, 86);
                    return;
                    case ATTACK_MOVE_OPTIONS.MOVE_4:
                this.#attackBattleMenurCursorPhaserImageGameObject.setPosition(265, 86);
                return;
            default:
                exhaustiveGuard(this.#selectedAttackMoveOptions);
                return;
        }
    }

}