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
            this._onDraftDecided(target);
            break;
        case MessageEvent.DRAFT_LAST_TURN:
            this._onDraftLastTurn(target);
            break;
        case MessageEvent.DRAFT_END:
            this._onDraftEnd(target);
            break;
        case MessageEvent.HELP:
            this._onHelp(target);
            break;
        case MessageEvent.HAND:
            this._onHand(target);
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
    
    _onGameForceQuit(playerID) {
    }
    
    _onDraftStart(info) {
    }
    
    _onDraftReady(info) {
        const buffer = [];
        buffer.push(`ドラフト${info.draftTurnCount + 1}巡目です。`);
        info.draftDeck(this._playerID).all.forEach((card) => {
            buffer.push(`\`\`\`${this._convertToString(card)}\`\`\``);
        });
        this.write(buffer.join('\n'));
    }
    
    _onDraftInvalid(info) {
        this.write('無効な指定です。再指定してください。');
    }
    
    _onDraftWrong(info) {
        this.write('指定されたカードがデッキにありません。再指定してください。');
    }
    
    _onDraftKept(info, cardID) {
        this.write(`${cardID}をハンドに追加しました。`);
    }
    
    _onDraftDecided(info) {
    }
    
    _onDraftLastTurn(info) {
        this._onDraftReady(info);
    }
    
    _onDraftEnd(info) {
    }
    
    _onHelp(info) {
    }
    
    _onHand(info) {
        const buffer = [];
        buffer.push('```');
        const idList = info.handTable[this._playerID].allID;
        buffer.push(idList.join(','));
        buffer.push('```');
        this.write(buffer.join('\n'));
    }
    
    _onGameInfo(info, playerID) {
    }
    
    _convertToString(cardData) {
        const lines = [ 
            cardData.name,
            `${cardData.type}   ${cardData.id}`,
            `コスト: ${(cardData.cost || '-')}`,
            `条件: ${(cardData.condition || '-')}`,
            `勝利点: ${(cardData.point || '-')}`,
            `人数: ${(cardData.player_number || '-')}`,
            cardData.text,
            '-----',
            cardData.text_en,
        ];  
        return lines.join('\n');
    }
    
}
