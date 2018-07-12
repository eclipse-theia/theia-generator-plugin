/**
 * Generated using theia-plugin-generator
 */ 
import * as theia from '@theia/plugin';

const disposables: theia.Disposable[] = [];

export function start() {
    const informationCommand: theia.Command = {
        id: 'information-message-command',
        label: 'information-message-command',
    };
    const informationModalCommand: theia.Command = {
        id: 'information-modal-message-command',
        label: 'Information Modal Message',
    };
    
    disposables.push(
        theia.commands.registerCommand(informationCommand, async (...args: any[]) => {
            const action = await theia.window.showInformationMessage('Information message!');
            console.log('Close information message', 'Resolve', action);
        })
    );

    disposables.push(theia.commands.registerCommand(informationModalCommand, async (...args: any[]) => {
            const action = await theia.window.showInformationMessage('Information modal message!', { modal: true },
                { title: 'action1' }, { title: 'action2', isCloseAffordance: true }, { title: 'action3' });
            console.log('Resolve', action);
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
