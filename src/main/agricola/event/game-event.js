/**
 * game-event.js
 * 
 * @author masaue
 */



export default {
    
    GAME_START         : 0x000001,
    GAME_SET           : 0x000003,
    GAME_CLOSE         : 0x000004,
    GAME_FORCE_QUIT    : 0x000005,
    
    DRAFT_START        : 0x000101,
    DRAFT_READY        : 0x000102,
    DRAFT_INVALID      : 0x000103,
    DRAFT_WRONG        : 0x000104,
    DRAFT_KEPT         : 0x000105,
    DRAFT_DECIDED      : 0x000106,
    DRAFT_NEXT_TURN    : 0x000107,
    DRAFT_LAST_TURN    : 0x000108,
    DRAFT_END          : 0x000109,

    HELP               : 0x000201,
    HAND               : 0x000202,
    //TODO 未実装
    //TURN_READY         : 0x000201,
    //TODO 未実装
    //END_ROUND          : 0x000201,
    
};
