/**
 * command-controller-test.js
 * 
 * @author masaue
 */

import assert from 'assert';

import PlayerAnnouncer from './announcer/player-announcer';
import TestFieldAnnouncer from './announcer/test-field-announcer';

import CommandController from './command-controller';



describe('CommandControllerTest', () => {
    let controller = undefined;
    let testFieldAnnouncer = new TestFieldAnnouncer();
    
    before(() => {
        controller = createCommandController();
    });
    
    beforeEach(() => {
        controller.onCommand('pink entry madoka', new PlayerAnnouncer('pink'));
        controller.onCommand('purple entry homura', new PlayerAnnouncer('purple'));
        controller.onCommand('pink start');
    });
    
    afterEach(() => {
        controller.close();
    });
    
    it('clears agricola-info at the end.', () => {
        [...Array(6).keys()].forEach((_) => {
            controller._autoKeep('pink');
            controller._autoKeep('purple');
        });
        controller.onCommand('yellow entry mami', new PlayerAnnouncer('yellow'));
        controller.onCommand('yellow start');
        assert(playerCount(testFieldAnnouncer.buffer) === 1);
    });
    
    it('clears agricola-info at the force end.', () => {
        controller.onCommand('pink end');
        controller.onCommand('yellow entry mami', new PlayerAnnouncer('yellow'));
        controller.onCommand('yellow start');
        assert(playerCount(testFieldAnnouncer.buffer) === 1);
    });
    
    
    
    function createCommandController() {
        return new CommandController(testFieldAnnouncer);
    }
    
    function playerCount(buffer) {
        const target = buffer.find((message) => { return /^席順/.test(message) });
        return target.split('、').length;
    }
    
});
