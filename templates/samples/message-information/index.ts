<%- include('../../base/ts-header.ts'); %>
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
            theia.window.showInformationMessage('Close information message ' + action!);
        })
    );

    disposables.push(theia.commands.registerCommand(informationModalCommand, async (...args: any[]) => {
            const action = await theia.window.showInformationMessage('Information modal message!', { modal: true },
                { title: 'action1' }, { title: 'action2', isCloseAffordance: true }, { title: 'action3' });
                theia.window.showInformationMessage('Resolve ' + action!.title);
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
