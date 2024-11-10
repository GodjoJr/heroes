import { HEROES } from "../../../assets/assets-keys.js";

const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'COMBATTRE',
    SWITCH: 'CHANGER',
    BAG: 'SAC',
    RUN: 'FUIR'
})

const battleUITextStyle = { color: '#000000', fontSize: '30px' }



export class BattleMenu {
    #scene;
    #mainBattleMenuPhaserContainerGameObject;
    #moveSelectionSubBattleMenuPhaserContainerGameObject;
    #battleTextGameObjectLine1;
    #battleTextGameObjectLine2;
    constructor(scene) {
        this.#scene = scene;
        this.#createMainInfoPane();
        this.#createMainBattleMenu();
        this.#createHeroAttackSubMenu();
    }

    showMainBattleMenu() {
        this.#battleTextGameObjectLine1.setText('Qu\'est ce que');
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
        this.#battleTextGameObjectLine1.setAlpha(1);
        this.#battleTextGameObjectLine2.setAlpha(1);
    }

    hideMainBattleMenu() {
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
        this.#battleTextGameObjectLine1.setAlpha(0);
        this.#battleTextGameObjectLine2.setAlpha(0);
    }

    showHeroAttackSubeMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
    }

    hideHeroAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
    }

    #createMainBattleMenu() {
        this.#battleTextGameObjectLine1 = this.#scene.add.text(25, 468, 'Qu\'est ce que', battleUITextStyle);
        this.#battleTextGameObjectLine2 = this.#scene.add.text(25, 508, `${HEROES.REAPER_ICE} veut faire ?`, battleUITextStyle);

        this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(520, 448, [
            this.#createSubInfoPane(),
            this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleUITextStyle),
            this.#scene.add.text(280, 22, BATTLE_MENU_OPTIONS.SWITCH, battleUITextStyle),
            this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.BAG, battleUITextStyle),
            this.#scene.add.text(280, 70, BATTLE_MENU_OPTIONS.RUN, battleUITextStyle)
        ]);

        this.hideMainBattleMenu();
    }

    #createHeroAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject = this.#scene.add.container(0, 448, [
            this.#scene.add.text(55, 22, 'Lame glace', battleUITextStyle),
            this.#scene.add.text(280, 22, '-', battleUITextStyle),
            this.#scene.add.text(55, 70, '-', battleUITextStyle),
            this.#scene.add.text(280, 70, '-', battleUITextStyle)
        ]);

        this.hideHeroAttackSubMenu();
    }

    #createMainInfoPane() {
        const padding = 4;
        const rectHeight = 124;
        this.#scene.add
            .rectangle(padding, this.#scene.scale.height - rectHeight - padding, this.#scene.scale.width - (padding * 2), rectHeight, 0xede4f3, 1)
            .setOrigin(0)
            .setStrokeStyle(8, 0x5D3A1A);
    }

    #createSubInfoPane() {
        const padding = 3;
        const rectHeight = 124;
        const rectWidth = 500;
        return this.#scene.add
            .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
            .setOrigin(0)
            .setStrokeStyle(6, 0x1E90FF);
    }
}