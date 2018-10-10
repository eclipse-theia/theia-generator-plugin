<%- include('../../base/ts-header.ts'); %>
import * as theia from '@theia/plugin';

export function start(context: theia.PluginContext) {
    // Hello World command
    const command: theia.Command = {
        id: 'template-command',
        label: 'Hello Template command'
    };
    context.subscriptions.push(
        theia.commands.registerCommand(command, (...args: any[]) => {
            theia.window.showInformationMessage(`Hello World command handler was called with arguments: ${args}`);
        })
    );
}

export function stop() {
    
}
