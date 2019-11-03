/**
 * field-announcer.js
 * 
 * @author masaue
 */

import MessageEvent from '../event/message-event';



export default class FieldAnnouncer {
    
    constructor() {
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
        case MessageEvent.DRAFT_READY:
            this._onDraftReady(target);
            break;
        case MessageEvent.ENTRY_PLAYER:
            this._onEntryPlayer(target, param.value);
            break;
        case MessageEvent.ENTRY_CLOSED:
            this._onEntryClosed(target, param.value);
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
    
    
    
    _onGameStart(info) {
        this.resetMessage();
    }
    
    _onGameSet(info, playerID) {
    }
    
    _onGameClose(playerID) {
        this.write(' * おわた * ');
    }
    
    _onDraftReady(info) {
    }
    
    _onEntryPlayer(info, playerName) {
        this.write(`${playerName}の参加を受け付けました。 （残り${4 - info.playerCount}人）`);
    }
    
    _onEntryClosed(info, playerName) {
        this.write(`悪いな${playerName}、このゲームは4人用なんだ。`);
    }
    
}
