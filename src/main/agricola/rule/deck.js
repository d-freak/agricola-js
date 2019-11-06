/**
 * deck.js
 * 
 * @author masaue
 */



export default class Deck {
    
    constructor() {
        this._minorImprovements = [];
        this._occupations = [];
    }
    
    get minorImprovements() {
        return this._minorImprovements;
    }
    
    get occupations() {
        return this._occupations;
    }
    
    set minorImprovements(value) {
        this._minorImprovements = value;
    }
    
    set occupations(value) {
        this._occupations = value;
    }
    
}
