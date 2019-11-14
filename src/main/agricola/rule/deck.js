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
    
    get all() {
        const all = [];
        all.push(...this._minorImprovements);
        all.push(...this._occupations);
        return all;
    }
    
    get allID() {
        return this.all.map((card) => { return card.id });
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
