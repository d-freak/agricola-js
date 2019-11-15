/**
 * agricola-util.js
 * 
 * @author masaue
 */

import database from './../../../../json/agricola_database.json';

import DraftDeck from './draft-deck';



export default class AgricolaUtil {
    
    static createDraftDeckTable(playerCount, cardPool = ['A', 'B']) {
        const draftDeckTable = {};
        const minorImprovements = this._cards('小さい進歩', playerCount, cardPool);
        const occupations = this._cards('職業', playerCount, cardPool);
        [...Array(playerCount).keys()].forEach((count) => {
            const draftDeck = new DraftDeck();
            draftDeck.minorImprovements = minorImprovements.splice(0, 7);
            draftDeck.occupations = occupations.splice(0, 7);
            draftDeckTable[count] = draftDeck;
        });
        return draftDeckTable;
    }
    
    static shuffleList(target) {
        for (let n = target.length; n > 0; n--) {
            const s = n - 1;
            const t = Math.floor(Math.random() * n);
            const temp = target[s];
            target[s] = target[t];
            target[t] = temp;
        }
    }
    
    
    
    static _cards(type, playerCount, cardPool) {
        const cardIDs = Object.keys(database)
               .filter((id) => { return database[id].type === type })
               .filter((id) => { return cardPool.includes(database[id].cardset) })
               .filter((id) => { return !database[id].player_number ||
                   playerCount >= parseInt(database[id].player_number[0]) });
        this.shuffleList(cardIDs);
        // TODO discriptionなどの不要な情報を削除
        return cardIDs.map((id) => { return database[id] });
    }
    
}
