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
            info.notifyAllObserver(MessageEvent.DRAFT_WRONG);
            info.notifyAllObserver(GameEvent.DRAFT_WRONG);
            return;
        }
        info.handTable[playerID].add(card);
        const ok = Object.keys(info.handTable).every((playerID) => {
            return info.handTable[playerID].ok(info.draftTurnCount);
        });
        if (!ok) {
            if (info.handTable[playerID].ok(info.draftTurnCount)) {
                info.notifyAllObserver(MessageEvent.DRAFT_DECIDED);
                info.notifyAllObserver(GameEvent.DRAFT_DECIDED);
            }
            return;
        }
        info.increaseDraftTurnCount();
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
            return;
        }
        info.notifyAllObserver(MessageEvent.DRAFT_READY);
        info.notifyAllObserver(GameEvent.DRAFT_READY);
    }
    
}
