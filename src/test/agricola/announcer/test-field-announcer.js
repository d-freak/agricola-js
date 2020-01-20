/**
 * test-field-announcer.js
 * 
 * @author masaue
 */

import FieldAnnouncer from './field-announcer';



export default class TestFieldAnnouncer extends FieldAnnouncer {
    
    constructor() {
        super();
        this.resetMessage();
    }
    
    resetMessage() {
        this._buffer = [];
    }
    
    write(message, reset = false) {
        if (reset) {
            this.resetMessage();
        }
        this._buffer.unshift(message);
    }
    
    get buffer() {
        return this._buffer;
    }
    
}
