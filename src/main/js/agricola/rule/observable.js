/**
 * observable.js
 * 
 * @author yuki
 */



export default class Observable {
    
    constructor() {
        this._observerList = [];
    }
    
    addObserver(observer) {
        if (observer) {
            if (!this._observerList.includes(observer)) {
                this._observerList.push(observer);
            }
        }
    }
    
    notifyAllObserver(event, playerID = undefined, value = undefined) {
        const param = { event: event, playerID: playerID, value: value };
        this._observerList.forEach((observer) => {
            observer.update(this, param);
        });
    }
    
    removeObserver(observer) {
        this._observerList.forEach((o, index) => {
            if (observer === o) {
                this._observerList.splice(index, 1);
            }
        });
    }
    
    removeAllObserver() {
        this._observerList = [];
    }
    
}
