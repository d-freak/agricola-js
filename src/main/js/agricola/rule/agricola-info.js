/**
 * agricola-info.js
 * 
 * @author masaue
 */

import Observable from './observable';



export default class AgricolaInfo extends Observable {
    
    constructor() {
        super();
        this._playerNameTable = {};
    }
    
    clear() {
        this._playerNameTable = {};
    }
    
    get playerCount() {
        return Object.keys(this._playerNameTable).length;
    }
    
    get playerNameTable() {
        return this._playerNameTable;
    }
    
}
