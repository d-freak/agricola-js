/**
 * hand.js
 * 
 * @author masaue
 */

import Deck from './deck';



export default class Hand extends Deck {
    
    constructor() {
        super();
    }
    
    add(card) {
        switch (card.type) {
        case '小さい進歩':
            this._minorImprovements.push(card);
            break;
        case '職業':
            this._occupations.push(card);
            break;
        }
    }
    
    ok(turnCount) {
        return this._minorImprovements.length === turnCount + 1 &&
               this._occupations.length === turnCount + 1;
    }
    
}
