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
        const buffer = [];
        const seatIndex = info.seatList
                          .findIndex((id) => { return id === this._playerID });
        const index = (seatIndex + info.draftTurnCount) % info.playerCount;
        [ 'minorImprovements', 'occupations' ].forEach((type) => {
            info.draftDeckTable[index][type].forEach((card) => {
                buffer.push(`\`\`\`${this._convertToString(card)}\`\`\``);
            });
        });
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
