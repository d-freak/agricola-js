/**
 * draft-deck.js
 * 
 * @author masaue
 */

import Deck from './deck';



export default class DraftDeck extends Deck {
    
    constructor() {
        super();
        this._DEFAULT_LENGTH = 7;
    }
    
    delete(ID, turnCount) {
        const card = this._delete(this._minorImprovements, ID, turnCount);
        if (card) {
            return card;
        }
        return this._delete(this._occupations, ID, turnCount);
    }
    
    get headID() {
        return this._minorImprovements[0].id;
    }
    
    get tailID() {
        return this._occupations.slice(-1)[0].id;
    }
    
    
    
    _canDelete(cardList, ID, turnCount) {
        return cardList.length === this._DEFAULT_LENGTH - turnCount &&
               this._includes(cardList, ID);
    }
    
    _delete(cardList, ID, turnCount) {
        if (this._canDelete(cardList, ID, turnCount)) {
            const index = cardList.map((card) => { return card.id }).indexOf(ID);
            return cardList.splice(index, 1)[0];
        }
        return undefined;
    }
    
    _includes(cardList, ID) {
        return this._IDs(cardList).includes(ID);
    }
    
}
