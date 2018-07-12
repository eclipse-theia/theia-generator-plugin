/**
 * Generated using theia-plugin-generator
 */ 
import * as theia from '@theia/plugin';

const disposables: theia.Disposable[] = [];

export function start() {
    // Hello World command
    const command: theia.Command = {
        id: 'simple-command',
        label: 'Hello World command'
    };
    disposables.push(
        theia.commands.registerCommand(command, (...args: any[]) => {
            console.log(`Hello World command handler was called with arguments: `, args);
        })
    );
}

export function stop() {
    while (disposables.length) {
        const disposable = disposables.pop();
        if (disposable) {
            disposable.dispose();
        }
    }
}
