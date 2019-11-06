/**
 * automaton.js
 * 
 * @author yuki
 */

import DefaultAI from './simple-AI';



export default class Automaton {
    
    constructor() {
        this._coreTable = {};
    }
    
    defaultAI(playerID) {
        this._registerAI(playerID, new DefaultAI());
        return this._coreTable[playerID].name;
    }
    
    getAI(playerID) {
        return this._coreTable[playerID];
    }
    
    update(target, param) {
        switch (param.event) {
        default:
            // TODO 未実装
            break;
        }
    }
    
    _registerAI(playerID, core) {
        core.initialize(playerID);
        this._coreTable[playerID] = core;
    }
    
}
