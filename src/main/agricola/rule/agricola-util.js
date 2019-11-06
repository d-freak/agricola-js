/**
 * agricola-util.js
 * 
 * @author masaue
 */

import fs from 'fs'
import path from 'path'

import Deck from './deck';



export default class AgricolaUtil {
    
    static createDraftDeckTable(playerCount, cardPool = ['A', 'B']) {
        const draftDeckTable = {};
        const minorImprovements = this._cards('小さい進歩', playerCount, cardPool);
        const occupations = this._cards('職業', playerCount, cardPool);
        [...Array(playerCount).keys()].forEach((count) => {
            const deck = new Deck();
            deck.minorImprovements = minorImprovements.splice(0, 7);
            deck.occupations = occupations.splice(0, 7);
            draftDeckTable[count] = deck;
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
        const DATABASE_PATH = '/../../../../json/agricola_database.json';
        const json = fs.readFileSync(path.join(__dirname + DATABASE_PATH));
        const database = JSON.parse(json);
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