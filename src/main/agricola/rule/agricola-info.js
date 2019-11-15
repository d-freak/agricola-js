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
        this._handTable = {};
        this._playerNameTable = {};
        this._seatList = [];
    }
    
    clear() {
        this._draftDeckTable = {};
        this._draftTurnCount = 0;
        this._handTable = {};
        this._playerNameTable = {};
        this._seatList = [];
    }
    
    clearDraftTurnCount() {
        this._draftTurnCount = 0;
    }
    
    draftDeck(playerID) {
        const seatIndex = this._seatList.indexOf(playerID);
        const index = (seatIndex + this._draftTurnCount) % this.playerCount;
        return this._draftDeckTable[index];
    }
    
    forEachPlayer(lambda) {
        Object.keys(this._playerNameTable).forEach(lambda);
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
    
    get handTable() {
        return this._handTable;
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
