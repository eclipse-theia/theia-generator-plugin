/**
 * Generated using theia-plugin-generator
 */ 
import * as theia from '@theia/plugin';

const disposables: theia.Disposable[] = [];

export function start() {
    registerCommand({
        id: 'status_bar-message-command-timeout',
        label: 'Status Bar Message With Timeout 5s',
        callback: () => {
            theia.window.setStatusBarMessage('$(dashboard) test status bar message message timeout - 5s', 5000);
        }
    });

    registerCommand({
        id: 'status_bar-message-command-promise',
        label: 'Status Bar Message With Promise 5s',
        callback: () => {
            const promise = sleep(5000);
            theia.window.setStatusBarMessage('$(dashboard) test status bar message message promise - 5s', promise);
        }
    });

    registerCommand({
        id: 'status_bar-message-command-disposable',
        label: 'Status Bar Message With Disposable 5s',
        callback: async () => {
            const disposable = theia.window.setStatusBarMessage('$(dashboard) test status bar message message promise - 5s');
            await sleep(5000);
            disposable.dispose();
        }
    });

    registerCommand({
        id: 'status_bar_item-command',
        label: 'Status Bar Item With Timeout 15',
        callback: async () => {
            const item = theia.window.createStatusBarItem(theia.StatusBarAlignment.Right, 99);
            item.text = 'Test Configure Excludes';
            item.tooltip = 'To enable project-wide ... language features, exclude large folders.';
            item.color = '#A5DF3B';
            item.show();
            await sleep(15000);
            item.dispose();
        }
    });
}

function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function registerCommand(command: { id: string, label: string, callback: (...args: any[]) => any }): void {
    disposables.push(
        theia.commands.registerCommand({
            id: command.id,
            label: command.label
        }, command.callback)
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
