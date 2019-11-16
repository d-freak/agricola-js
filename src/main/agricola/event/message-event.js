/**
 * message-event.js
 * 
 * @author masaue
 */



export default {
    
    GAME_START         : 'GAME_START',
    GAME_SET           : 'GAME_SET',
    GAME_CLOSE         : 'GAME_CLOSE',
    GAME_FORCE_QUIT    : 'GAME_FORCE_QUIT',
    
    DRAFT_START        : 'DRAFT_START',
    DRAFT_READY        : 'DRAFT_READY',
    DRAFT_INVALID      : 'DRAFT_INVALID',
    DRAFT_WRONG        : 'DRAFT_WRONG',
    DRAFT_KEPT         : 'DRAFT_KEPT',
    DRAFT_DECIDED      : 'DRAFT_DECIDED',
    DRAFT_NEXT_TURN    : 'DRAFT_NEXT_TURN',
    DRAFT_LAST_TURN    : 'DRAFT_LAST_TURN',
    DRAFT_END          : 'DRAFT_END',
    
    HELP               : 'HELP',
    HAND               : 'HAND',
    //TODO 未実装
    //TURN_READY         : 'TURN_READY',
    //TODO 未実装
    //END_ROUND          : 'END_ROUND',
    
    ENTRY_PLAYER       : 'ENTRY_PLAYER',
    ENTRY_CLOSED       : 'ENTRY_CLOSED',
    
};
