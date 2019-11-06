/**
 * console-field-announcer.js
 * 
 * @author yuki
 */

import FieldAnnouncer from './field-announcer';

import BufferThread from './buffer-thread';



export default class ConsoleFieldAnnouncer extends FieldAnnouncer {
    
    constructor() {
        super();
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
        this._buffer.push(message);
    }
    
}
