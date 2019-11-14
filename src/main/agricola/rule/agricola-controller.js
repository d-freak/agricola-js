/**
 * agricola-controller.js
 * 
 * @author masaue
 */

import AgricolaUtil from './agricola-util';
import GameEvent from '../event/game-event';
import MessageEvent from '../event/message-event';



export default class AgricolaController {
    
    constructor() {
    }
    
    entry(info, playerID, playerName) {
        if (info.playerCount < 5) {
            info.playerNameTable[playerID] = playerName;
            info.notifyAllObserver(MessageEvent.ENTRY_PLAYER, playerID, playerName);
        }
        else {
            info.notifyAllObserver(MessageEvent.ENTRY_CLOSED, playerID, playerName);
        }
    }
    
    keep(info, playerID, card) {
        // TODO 未実装
    }
    
    start(info, playerID) {
        this._decideSeat(info);
        info.notifyAllObserver(MessageEvent.DRAFT_START);
        info.notifyAllObserver(GameEvent.DRAFT_START);
        info.clearDraftTurnCount();
        this._draft(info, playerID);
    }
    
    
    
    _decideSeat(info) {
        const playerIDList = Object.keys(info.playerNameTable);
        AgricolaUtil.shuffleList(playerIDList);
        info.seatList = playerIDList;
    }
    
    _draft(info, playerID) {
        info.draftDeckTable = AgricolaUtil.createDraftDeckTable(info.playerCount);
        
        // TODO リプレイ用のデータ保存
        
        this._draftReady(info, playerID);
    }
    
    _draftReady(info, playerID) {
        if (info.remainDeck === 0) {
            info.notifyAllObserver(MessageEvent.GAME_SET);
            info.notifyAllObserver(GameEvent.GAME_SET);
            return;
        }
        info.notifyAllObserver(MessageEvent.DRAFT_READY);
        info.notifyAllObserver(GameEvent.DRAFT_READY);
    }
    
}
