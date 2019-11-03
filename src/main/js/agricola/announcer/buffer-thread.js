/**
 * buffer-thread.js
 * 
 * @author yuki
 */



export default class BufferThread {
    
    constructor(process, interval = 5) {
        this._process = process;
        this._interval = interval;
        this._data = [];
    }
    
    push(value) {
        this._data.push(value);
    }
    
    start() {
        if (this._data.length !== 0) {
            this._process(this._data.splice(0, this._data.length));
        }
        setTimeout(this.start.bind(this), this._interval);
        return this;
    }
    
}
