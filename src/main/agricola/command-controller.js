/**
 * command-controller.js
 * 
 * @author masaue
 */

import Automaton from './automaton';
import ConsoleFieldAnnouncer from './announcer/console-field-announcer';
import ConsolePlayerAnnouncer from './announcer/console-player-announcer';
import GameEvent from './event/game-event';
import GameMaster from './game-master';



export default class CommandController {
    
    constructor(fieldAnnouncer) {
        this._fieldAnnouncer = fieldAnnouncer ? fieldAnnouncer :
                                                new ConsoleFieldAnnouncer();
        this._playerAnnouncerList = [];
        this._master = new GameMaster();
        this._automaton = new Automaton();
        this._dataDirPath = '';
        this._master.addObserver(this);
        this._master.addObserver(this._automaton);
        this._master.addObserver(this._fieldAnnouncer);
    }
    
    close() {
        this._master.end(true);
        this._playerAnnouncerList.forEach((announcer) => {
            this._master.removeObserver(announcer);
        });
        this._playerAnnouncerList = [];
    }
    
    initialize(dataDirPath) {
        this._dataDirPath = dataDirPath;
    }
    
    onCommand(commands, playerAnnouncer = undefined) {
        const paramList = commands.trim().replace(/ {2,}/g, ' ').split(' ');
        const playerID = paramList.shift();
        const command = paramList.shift().toLowerCase();
        switch (command) {
        case 'e':
        case 'entry':
            if (this._master.closed) {
                this._addObserver(playerAnnouncer ? playerAnnouncer :
                                                    new ConsolePlayerAnnouncer(playerID));
                this._master.entry(playerID, paramList[0]);
            }
            break;
        case 's':
        case 'start':
            if (this._master.closed) {
                if (!isNaN(paramList[0])) {
                    const playerCount = parseInt(paramList[0]);
                    const maxPlayer = playerCount < 5 ? playerCount : 5;
                    for (let i = this._master.info.playerCount; i < maxPlayer; i++) {
                        const id = `CPU0${i}`;
                        const name = this._automaton.defaultAI(id);
                        this._master.entry(id, name);
                    }
                }
                this._master.start(playerID);
            }
            break;
        case 'h':
        case 'hand':
            if (!this._master.closed) {
                this._master.hand(playerID);
            }
            break;
        case 'k':
        case 'keep':
            if (!this._master.closed) {
                this._master.keep(playerID, paramList[0]);
            }
            break;
        case 'i':
        case 'info':
            // TODO 未実装
            break;
        case 'undo':
            // TODO 未実装
            break;
        case 'load':
            // TODO 未実装
            break;
        case 'help':
            this._master.help(playerID);
            break;
        case 'end':
        case 'exit':
        case 'quit':
            this.close();
            break;
        default:
            break;
        }
    }
    
    update(target, param) {
        this._master.status = param.event;
        switch (param.event) {
        case GameEvent.GAME_SET:
            this._master.end();
            break;
        case GameEvent.DRAFT_READY:
            this._onDraftReady(target);
            break;
        default:
            break;
        }
    }
    
    
    
    _addObserver(announcer) {
        this._playerAnnouncerList.push(announcer);
        this._master.addObserver(announcer);
    }
    
    _onDraftReady(info) {
        info.forEachPlayer((playerID) => {
            if (/CPU0[1-4]/.test(playerID)) {
                this._master.keep(playerID, info.draftDeck(playerID).headID);
                this._master.keep(playerID, info.draftDeck(playerID).tailID);
            }
        });
    }
    
}
