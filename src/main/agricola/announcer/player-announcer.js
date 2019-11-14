/**
 * player-announcer.js
 * 
 * @author masaue
 */

import MessageEvent from '../event/message-event';



export default class PlayerAnnouncer {
    
    constructor(playerID) {
        this._playerID = playerID;
    }
    
    update(target, param) {
        switch (param.event) {
        case MessageEvent.GAME_START:
            this._onGameStart(target);
            break;
        case MessageEvent.GAME_SET:
            this._onGameSet(target, param.playerID);
            break;
        case MessageEvent.GAME_CLOSE:
            this._onGameClose(param.playerID);
            break;
        case MessageEvent.DRAFT_START:
            this._onDraftStart(target);
            break;
        case MessageEvent.DRAFT_READY:
            this._onDraftReady(target);
            break;
        default:
            break;
        }
    }
    
    resetMessage() {
        // 継承先に任せる
    }
    
    write(message, reset = false) {
        // 継承先に任せる
    }
    
    get playerID() {
        return this._playerID;
    }
    
    
    
    _onGameStart(info) {
        this.resetMessage();
    }
    
    _onGameSet(info, playerID) {
    }
    
    _onGameClose(playerID) {
        this.write(' * おわた * ');
    }
    
    _onDraftStart(info) {
    }
    
    _onDraftReady(info) {
        // TODO 未実装
        /*
        if (info.activePlayerID === this._playerID) {
            const buffer = [];
            buffer.push(`${info.turnCount}巡目`);
            buffer.push(`場風：${info.field.wind}　自風：${info.activePlayerWind}　残り枚数：${info.remainDeck}`);
            buffer.push(`${this._convertHandToString(info.activePlayerHand)} ${info.activeTsumo}`);
            this.write(buffer.join('\n'));
        }
         */
    }
    
    _onGameInfo(info, playerID) {
    }
    
}
