/**
 * agricola-controller.js
 * 
 * @author masaue
 */

import AgricolaUtil from './agricola-util';
import GameEvent from '../event/game-event';
import Hand from './hand';
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
    
    keep(info, playerID, cardID) {
        const card = info.draftDeck(playerID).delete(cardID, info.draftTurnCount);
        if (!card) {
            info.notifyObserver(MessageEvent.DRAFT_WRONG, playerID);
            info.notifyObserver(GameEvent.DRAFT_WRONG, playerID);
            return;
        }
        info.notifyObserver(MessageEvent.DRAFT_KEPT, playerID, cardID);
        info.notifyObserver(GameEvent.DRAFT_KEPT, playerID, cardID);
        info.handTable[playerID].add(card);
        const ok = Object.keys(info.handTable).every((playerID) => {
            return info.handTable[playerID].ok(info.draftTurnCount);
        });
        if (!ok) {
            if (info.handTable[playerID].ok(info.draftTurnCount)) {
                info.notifyAllObserver(MessageEvent.DRAFT_DECIDED, playerID);
                info.notifyAllObserver(GameEvent.DRAFT_DECIDED, playerID);
            }
            return;
        }
        info.increaseDraftTurnCount();
        info.notifyAllObserver(MessageEvent.DRAFT_NEXT_TURN, playerID);
        info.notifyAllObserver(GameEvent.DRAFT_NEXT_TURN, playerID);
        this._draftReady(info, playerID);
    }
    
    start(info, playerID) {
        this._decideSeat(info);
        info.notifyAllObserver(MessageEvent.DRAFT_START);
        info.notifyAllObserver(GameEvent.DRAFT_START);
        info.clearDraftTurnCount();
        info.forEachPlayer((playerID) => {
            info.handTable[playerID] = new Hand();
        });
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
        if (info.draftTurnCount === 7) {
            info.notifyAllObserver(MessageEvent.DRAFT_END);
            info.notifyAllObserver(GameEvent.DRAFT_END);
            info.notifyAllObserver(MessageEvent.GAME_SET);
            info.notifyAllObserver(GameEvent.GAME_SET);
        }
        else if (info.draftTurnCount === 6) {
            info.notifyAllObserver(MessageEvent.DRAFT_LAST_TURN);
            info.notifyAllObserver(GameEvent.DRAFT_LAST_TURN);
        }
        else {
            info.notifyAllObserver(MessageEvent.DRAFT_READY);
            info.notifyAllObserver(GameEvent.DRAFT_READY);
        }
    }
    
}
