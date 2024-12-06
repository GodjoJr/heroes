import Phaser from "../lib/phaser.js";
import { BATTLE_BACKGROUND_ASSET_KEYS } from "../assets/assets-keys.js";
import { SCENE_KEYS } from "./scene-keys.js";
import { HEROES } from "../assets/assets-keys.js";
import { BATTLE_ASSET_KEYS } from "../assets/assets-keys.js";
import { HEALTH_BAR_ASSET_KEYS } from "../assets/assets-keys.js";
import { UI_ASSET_KEYS } from "../assets/assets-keys.js";
import { DATA_ASSET_KEYS } from "../assets/assets-keys.js";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super(
            {
                key: SCENE_KEYS.PRELOAD_SCENE,
            }
        );
        console.log(SCENE_KEYS.PRELOAD_SCENE);
    }

    init() {
        console.log("init");
    }

    preload() {

        console.log(`[${PreloadScene.name}]:preload] invoked`);


        const backroundsPath = '/assets/images/backgrounds/';
        const uiPath = '/assets/images/ui/';
        const heroesPath = '/assets/images/heroes/';

        // backgrounds assets
        this.load.image(
            BATTLE_BACKGROUND_ASSET_KEYS.CASTLE,
            backroundsPath + '/bridge/bridge-castle.png'
        );
        this.load.image(
            BATTLE_BACKGROUND_ASSET_KEYS.BAMBOO,
            backroundsPath + '/bridge/bridge-bamboo.png'
        );

        // health bar components assets
        this.load.image(
            BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
            uiPath + 'health-bar/healthBar-ui-background.png'
        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.LEFT_CAP,
            uiPath + 'health-bar/healthBar-leftCap-red.png'
        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.MIDDLE,
            uiPath + 'health-bar/healthBar-middle-red.png'
        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.RIGHT_CAP,
            uiPath + 'health-bar/healthBar-rightCap-red.png'

        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.LEFT_CAP_SHADOW,
            uiPath + 'health-bar/healthBar-background-leftCap.png'
        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.MIDDLE_SHADOW,
            uiPath + 'health-bar/healthBar-background-middle.png'
        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.RIGHT_CAP_SHADOW,
            uiPath + 'health-bar/healthBar-background-rightCap.png'
        );

        // heroes assets
        this.load.image(
            HEROES.REAPER_ICE,
            heroesPath + 'reaper/reaper-ice.png'
        );
        this.load.image(
            HEROES.REAPER_FIRE,
            heroesPath + 'reaper/reaper-fire.png'
        );

        // ui assets
        this.load.image(
            UI_ASSET_KEYS.CURSOR,
            uiPath + 'cursor.png'
        );

        this.load.image(
            UI_ASSET_KEYS.CURSOR_TEXT,
            uiPath + 'cursor-text.png'
        )

        //load json data
        this.load.json(
            DATA_ASSET_KEYS.ATTACKS,
            '/assets/data/attacks.json'
        );
    }

    create() {
        console.log(`[${PreloadScene.name}]:create] invoked`);
        this.scene.start(SCENE_KEYS.BATTLE_SCENE);
    }

    update() {
        console.log("update");
    }
}