/**
 * Generated using theia-plugin-generator
 */ 
import * as theia from '@theia/plugin';

const disposables: theia.Disposable[] = [];

export function start() {
    // Hello World command
    const command: theia.Command = {
        id: 'template-command',
        label: 'Hello Template command'
    };
    disposables.push(
        theia.commands.registerCommand(command, (...args: any[]) => {
            theia.window.showInformationMessage(`Hello World command handler was called with arguments: ${args}`);
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
