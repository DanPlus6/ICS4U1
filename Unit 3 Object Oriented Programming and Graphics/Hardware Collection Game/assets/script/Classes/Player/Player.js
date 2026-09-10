'use strict';

import { MovingEntity } from '../Entities/MovingEntity.js';
import { Canvas } from '../GameScreen/Canvas.js';
import { ActionMap } from './ActionMap.js';

export class Player extends MovingEntity {
    /**
     * Object representing a player entity
     * @param {Object} args destructured object containing arguments
     * @param {string} args.path path to the image for player's sprite
     * @param {ActionMap} args.actMap active ActionMap object to check for player actions
     * @param {number} [args.width] width for player avatar
     * @param {number} [args.height] height for player avatar
     * @param {number} [args.kpMin] minimum movement speed for player
     * @param {number} [args.kpMax] maximum movement speed for player
     */
    constructor({path='assets/img/PlayerAvatar/trollge.png', actMap, width=96, height=96, kp=4}) {
        // inherit properties from MovingEntity class
        super({path:path, width:width, height:height, kp:kp});

        // Player actions
        this.actMap = actMap;
    }

    /** Communicate with action map to perform player actions if valid key(s) are pressed */
    update() {
        /** lambda/short-form for checking state of an action */
        const check = act => this.actMap.isActive(act);
        
        // Move up if valid control key(s) are active
        if (check('mvUp')) {
            this.oldY = this.y;

            let new_y = this.y - this.kp;
            // Move up normally only if the player stays inside the canvas.
            if (new_y >= 0) this.y = new_y;
            else this.y = 0;
        }
        // Move down if valid control key(s) are active
        if (check('mvDown')) {
            this.oldY = this.y;

            let new_y = this.y + this.kp;
            // Move down normally only if the player stays inside the canvas.
            if (new_y + this.h <= globalThis.CV_HEIGHT) this.y = new_y;
            else this.y = globalThis.CV_HEIGHT - this.h;
        }
        // Move left if valid control key(s) are active
        if (check('mvLeft')) {
            this.oldX = this.x;

            let new_x = this.x - this.kp;
            // Move left normally only if the player stays inside the canvas.
            if (new_x >= 0) this.x = new_x;
            else this.x = 0;
        }
        // Move right if valid control key(s) are active
        if (check('mvRight')) {
            this.oldX = this.x;

            let new_x = this.x + this.kp;
            // Move right normally only if the player stays inside the canvas.
            if (new_x + this.w <= globalThis.CV_WIDTH) this.x = new_x;
            else this.x = globalThis.CV_WIDTH - this.w;
        }
    }
}
