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

        if(Math.random() > 0.5) {
            this.load.image(
                BATTLE_BACKGROUND_ASSET_KEYS.BRIDGE,
                backroundsPath + '/bridge/bridge-castle.png'
            );
        } else {
            this.load.image(
                BATTLE_BACKGROUND_ASSET_KEYS.BRIDGE,
                backroundsPath + '/bridge/bridge-bamboo.png'
            );
        }

        this.load.image(
            BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
            uiPath + 'health-bar/health-bar-background.png'
        );

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.LEFT_CAP,
            uiPath + 'health-bar/barRed_horizontalLeft.png'

        );
        this.load.image(
            HEALTH_BAR_ASSET_KEYS.MIDDLE,
            uiPath + 'health-bar/barRed_horizontalMid.png'
        );

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.RIGHT_CAP,
            uiPath + 'health-bar/barRed_horizontalRight.png'

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
        console.log(`[${PreloadScene.name}]:create] invoked`);
        this.scene.start(SCENE_KEYS.BATTLE_SCENE);
    }

    update() {
        console.log("update");
    }
}