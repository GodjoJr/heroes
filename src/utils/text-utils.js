import Phaser from "../lib/phaser.js";

/**
 * @typedef AnimateTextConfig
 * @type {object}
 * @property {() => void} [callback]
 * @property {number} [delay = 25]
 */

/**
* @param {Phaser.Scene} scene the Phaser 3 scene the time event will be addet to
* @param {Phaser.GameObjects.Text} target the Phaser 3 Text Gamge object that will be animated
* @param {string} text the text to display on the target game object
* @param {AnimateTextConfig} [config]
* @returns {void}
*/

export function animateText(scene, target, text, config) {
    const length = text.length;
    let i = 0;
    scene.time.addEvent({
        callback: () => {
            target.text += text[i];
            ++i;
            if (i === length && config?.callback) {
                config.callback();
            }
        },
        repeat: length - 1,
        delay: config?.delay || 25,
    });
}