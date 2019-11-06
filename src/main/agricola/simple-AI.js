/**
 * simple-AI.js
 * 
 * @author yuki
 */



export default class SimpleAI {
    
    constructor() {
        this._playerID = undefined;
    }
    
    initialize(playerID) {
        this._playerID = playerID;
    }
    
    get name() {
        return 'SimpleAI';
    }
    
    get playerID() {
        return this._playerID;
    }
    
}
