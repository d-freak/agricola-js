/**
 * game-master.js
 * 
 * @author masaue
 */

import AgricolaController from './rule/agricola-controller';
import GameEvent from './event/game-event';
import MessageEvent from './event/message-event';
import AgricolaInfo from './rule/agricola-info';



export default class GameMaster {
    
    constructor() {
        this._closed = true;
        this._status = GameEvent.GAME_CLOSE;
        this._info = new AgricolaInfo();
        this._backupList = [];
        this._keptPlayerList = [];
    }
    
    addObserver(observer) {
        this._info.addObserver(observer);
    }
    
    end(force = false) {
        if (!this._closed) {
            if (force) {
                this._info.notifyAllObserver(MessageEvent.GAME_FORCE_QUIT);
            }
            this._closed = true;
        }
    }
    
    entry(playerID, playerName) {
        const controller = this._createController();
        controller.entry(this._info, playerID, playerName);
    }
    
    keep(playerID, target) {
        if (!this._isCard(target)) {
            this._info.notifyAllObserver(MessageEvent.DRAFT_INVALID);
            return;
        }
        const controller = this._createController();
        controller.keep(this._info, playerID, target.toUpperCase());
    }
    
    removeObserver(observer) {
        this._info.removeObserver(observer);
    }
    
    start(playerID) {
        const controller = this._createController();
        controller.start(this._info, playerID);
        this._closed = false;
    }
    
    get info() {
        return this._info;
    }
    
    get closed() {
        return this._closed;
    }
    
    get status() {
        return this._status;
    }
    
    set status(value) {
        this._status = value;
    }
    
    
    
    _createController() {
        return new AgricolaController();
    }
    
    _isCard(target) {
        return target.length === 4 && /[AB][01]\d\d/i.test(target);
    }
    
}
