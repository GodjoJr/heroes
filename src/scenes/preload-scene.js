import Phaser from "../lib/phaser.js";
import { BATTLE_BACKGROUND_ASSET_KEYS } from "../assets/assets-keys.js";
import { SCENE_KEYS } from "./scene-keys.js";
import { HEROES } from "../assets/assets-keys.js";
import { BATTLE_ASSET_KEYS } from "../assets/assets-keys.js";
import { HEALTH_BAR_ASSET_KEYS } from "../assets/assets-keys.js";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super(
            {
                key: SCENE_KEYS.PRELOAD_SCENE,
                active: true,
            }
        );
        console.log(SCENE_KEYS.PRELOAD_SCENE);
    }

    init() {
        console.log("init");
    }

    preload() {

        console.log("preload");

        const backroundsPath = '/assets/images/backgrounds/';
        const uiPath = '/assets/images/ui/';
        const heroesPath = '/assets/images/heroes/';

        this.load.image(
            BATTLE_BACKGROUND_ASSET_KEYS.BRIDGE,
            backroundsPath + 'bridge/bridge-castle.png'
        );

        this.load.image(
            BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
            uiPath + 'health-bar/health-bar-background.png'
        );

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.LEFT_CAP,
            uiPath + 'health-bar/barBlue_horizontalLeft.png'

        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.MIDDLE,
            uiPath + 'health-bar/barBlue_horizontalBlue.png'
        );

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.RIGHT_CAP,
            uiPath + 'health-bar/barBlue_horizontalRight.png'

        );

        this.load.image(
            HEROES.REAPER_ICE,
            heroesPath + 'reaper/reaper-ice.png'
        );

        this.load.image(
            HEROES.REAPER_FIRE,
            heroesPath + 'reaper/reaper-fire.png'
        );


    }

    create() {
        const background = this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.BRIDGE);
        background.setOrigin(0.5, 0.5); 

        background.x = this.cameras.main.width / 2;
        background.y = this.cameras.main.height / 2;

        const scaleX = this.cameras.main.width / background.width;
        const scaleY = this.cameras.main.height / background.height;
        const scale = Math.min(scaleX, scaleY);
        background.setScale(scale);
    }

    update() {
        console.log("update");
    }
}