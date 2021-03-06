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
        case MessageEvent.GAME_FORCE_QUIT:
            this._onGameForceQuit(param.playerID);
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
        case MessageEvent.DRAFT_KEPT:
            this._onDraftKept(target, param.value);
            break;
        case MessageEvent.DRAFT_DECIDED:
            this._onDraftDecided(target, param.playerID);
            break;
        case MessageEvent.DRAFT_NEXT_TURN:
            this._onDraftNextTurn(target, param.playerID);
            break;
        case MessageEvent.DRAFT_LAST_TURN:
            this._onDraftLastTurn(target);
            break;
        case MessageEvent.DRAFT_END:
            this._onDraftEnd(target);
            break;
        case MessageEvent.HAND:
            this._onHand(target);
            break;
        case MessageEvent.HELP:
            this._onHelp(target);
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
        this.write('終了しました。');
    }
    
    _onGameClose(playerID) {
        this.write(' * おわた * ');
    }
    
    _onGameForceQuit(playerID) {
        this.write('強制終了しました。');
    }
    
    _onDraftStart(info) {
        const seat = info.seatList.map((id) => {
            return info.playerNameTable[id];
        }).join('、');
        this.write(`席順は${seat}です。`);
        this.write('ドラフトを開始します。');
    }
    
    _onDraftReady(info) {
        this.write(`------------------------------ ドラフト${info.draftTurnCount + 1}ターン目です ------------------------------`);
    }
    
    _onDraftInvalid(info) {
    }
    
    _onDraftWrong(info) {
    }
    
    _onDraftKept(info, cardID) {
    }
    
    _onDraftDecided(info, playerID) {
        this.write(`${info.playerNameTable[playerID]}の選択が終了しました。`);
        const thinking = info.seatList.filter((id) => {
            return !info.handTable[id].ok(info.draftTurnCount);
        }).map((id) => { return info.playerNameTable[id] }).join('、');
        this.write(`${thinking}がまだ選択中です。しばらくお待ちください。`);
    }
    
    _onDraftNextTurn(info, playerID) {
        this.write(`${info.playerNameTable[playerID]}の選択が終了しました。`);
        this.write('次ターンへ進みます。');
    }
    
    _onDraftLastTurn(info) {
        this.write(`------------------------------ ドラフト${info.draftTurnCount + 1}ターン目です ------------------------------`);
        this.write('最終ターンなので自動選択します。');
    }
    
    _onDraftEnd(info) {
        const buffer = [];
        buffer.push('ドラフトを終了しました。');
        buffer.push('それぞれのハンドは以下のようになりました。');
        buffer.push(...this._handIDList(info));
        buffer.push('ソート版は以下になります。');
        buffer.push(...this._handIDList(info, true));
        this.write(buffer.join('\n'));
    }
    
    _onHelp(info) {
        const buffer = [];
        buffer.push('```');
        buffer.push('e, entry:参加   s, start (人数):(人数で)開始 ※ 足りない人数はAIが補う');
        buffer.push('h, hand:手札確認   k, keep:手札へキープ   end, exit, quit:終了   help:ヘルプ');
        buffer.push('```');
        this.write(buffer.join('\n'));
    }
    
    _onHand(info) {
    }
    
    _onEntryPlayer(info, playerName) {
        this.write(`${playerName}の参加を受け付けました。 （残り${5 - info.playerCount}人まで）`);
    }
    
    _onEntryClosed(info, playerName) {
        this.write(`悪いな${playerName}、このゲームは5人用なんだ。`);
    }
    
    _handIDList(info, sort = false) {
        const buffer = [];
        info.seatList.forEach((id) => {
            buffer.push(`${info.playerNameTable[id]}`);
            buffer.push('```');
            const idList = info.handTable[id].allID;
            if (sort) {
                idList.sort();
            }
            idList.splice(7, 0, '\n');
            buffer.push(idList.join(',').replace(/,\n,/, '\n'));
            buffer.push('```');
        });
        return buffer;
    }
    
}
