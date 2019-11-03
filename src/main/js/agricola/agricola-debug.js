/**
 * agricola-debug.js
 * 
 * @author masaue
 */

import readline from 'readline';

import CommandController from './command-controller';



(() => {
    const controller = new CommandController();
    const agricolaIO = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    controller.initialize('.');
    
    const wrapper = (commands) => {
        if (commands) {
            controller.onCommand(`0 ${commands}`);
        }
    };
    agricolaIO.on('line', wrapper);
    agricolaIO.prompt();
    
    controller.onCommand("0 entry プレイヤー");
    console.log("press 's' to start. (※Ctrl+C to exit.)");
})();
