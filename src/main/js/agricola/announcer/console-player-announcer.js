/**
 * console-player-announcer.js
 * 
 * @author yuki
 */

import PlayerAnnouncer from './player-announcer';

import BufferThread from './buffer-thread';



export default class ConsolePlayerAnnouncer extends PlayerAnnouncer {
    
    constructor(playerID) {
        super(playerID);
        this._buffer = new BufferThread((list) => {
            console.log(list.join('\n'));
        }, 150).start();
    }
    
    resetMessage() {
        this._buffer.push('');
    }
    
    write(message, reset = false) {
        if (reset) {
            this.resetMessage();
        }
        if (!/CPU0[1-4]/.test(this.playerID)) {
            this._buffer.push(message);
        }
    }
    
}
