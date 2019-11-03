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
    
    start(info, playerID) {
        this._draft(info, playerID);
    }
    
    
    
    _ready(info, playerID) {
        if (info.remainDeck === 0) {
            info.notifyAllObserver(MessageEvent.GAME_DRAW);
            info.notifyAllObserver(GameEvent.GAME_DRAW);
            return;
        }
        info.activeTsumo = info.draw();
        info.callMode = false;
        info.notifyAllObserver(MessageEvent.TURN_READY);
        info.notifyAllObserver(GameEvent.TURN_READY);
    }
    
    _draft(info, playerID) {
        // TODO 未実装
        /*
        info.deck = JanUtil.createDeck();
        JanUtil.shuffleList(info.deck);
        
        // TODO リプレイ用のデータ保存
        
        info.forEachPlayer((playerID) => {
            const janpaiList = info.deck.splice(0, 13);
            JanUtil.sortJanpaiList(janpaiList);
            info.playerHandTable[playerID] = new Hand(janpaiList);
            info.playerHandTable[playerID].updateWaitTable();
            info.playerRiverTable[playerID] = new River();
        });
        
        // TODO リーチフラグ
        
        info.clearTurnCount();
        info.activePlayerID = info.playerID(Wind.TON);
        this._ready(info, playerID);
         */
    }
    
}
