/**
 * agricola-info.js
 * 
 * @author masaue
 */

import Observable from './observable';



export default class AgricolaInfo extends Observable {
    
    constructor() {
        super();
        this._draftDeckTable = {};
        this._draftTurnCount = 0;
        this._playerNameTable = {};
        this._seatList = [];
    }
    
    clear() {
        this._draftDeckTable = {};
        this._draftTurnCount = 0;
        this._playerNameTable = {};
        this._seatList = [];
    }
    
    clearDraftTurnCount() {
        this._draftTurnCount = 0;
    }
    
    increaseDraftTurnCount() {
        this._draftTurnCount++;
    }
    
    get draftDeckTable() {
        return this._draftDeckTable;
    }
    
    get draftTurnCount() {
        return this._draftTurnCount;
    }
    
    get playerCount() {
        return Object.keys(this._playerNameTable).length;
    }
    
    get playerNameTable() {
        return this._playerNameTable;
    }
    
    get seatList() {
        return this._seatList;
    }
    
    set draftDeckTable(value) {
        this._draftDeckTable = value;
    }
    
    set seatList(value) {
        this._seatList = value;
    }
    
}
