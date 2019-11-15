/**
 * field-announcer.js
 * 
 * @author masaue
 */

import MessageEvent from '../event/message-event';



export default class FieldAnnouncer {
    
    constructor() {
        this._DEFAULT_LENGTH = 7;
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
        case MessageEvent.DRAFT_INVALID:
            this._onDraftInvalid(target);
            break;
        case MessageEvent.DRAFT_WRONG:
            this._onDraftWrong(target);
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
    
    _onDraftStart(info) {
        const seat = info.seatList.map((id) => {
            return info.playerNameTable[id];
        }).join('、');
        this.write(`席順は${seat}です。`);
        this.write('ドラフトを開始します。');
    }
    
    _onDraftReady(info) {
        const buffer = [];
        Object.keys(info.draftDeckTable).forEach((key) => {
            buffer.push('```');
            const idList = info.draftDeckTable[key].allID;
            idList.splice(this._DEFAULT_LENGTH - info.draftTurnCount, 0, '\n');
            buffer.push(idList.join(',').replace(/,\n,/, '\n'));
            buffer.push('```');
        });
        // デバッグ用。最終的には消す
        this.write(buffer.join('\n'));
    }
    
    _onDraftInvalid(info) {
    }
    
    _onDraftWrong(info) {
    }
    
    _onEntryPlayer(info, playerName) {
        this.write(`${playerName}の参加を受け付けました。 （残り${5 - info.playerCount}人まで）`);
    }
    
    _onEntryClosed(info, playerName) {
        this.write(`悪いな${playerName}、このゲームは5人用なんだ。`);
    }
    
}
