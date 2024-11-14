import Phaser from "../lib/phaser";

/**
 * @typedef BattleHeroConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Hero} heroDetails
 */

/**
 * @typedef Hero
 * @type {Object}
 * @property {string} name
 * @property {string} assetKey
 * @property {number} [assetFrame = 0]
 * @property {number} maxHp
 * @property {number} currentHp
 * @property {number} baseAttack
 * @property {number[]} attackIds
 * 
 */

/**
 * @typedef Coordinate
 * @type {Object}
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef Attack
 * @type {Object}
 * @property {number} id
 * @property {string} name
 * @property {string} animationName
 */