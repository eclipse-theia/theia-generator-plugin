<%- include('../../base/ts-header.ts'); %>
import * as theia from '@theia/plugin';

export function start(context: theia.PluginContext) {
    context.subscriptions.push(
        theia.commands.registerCommand({
                id: 'quick-pick-string-command',
                label: 'Quick Pick String Items',
            }, () => {
                theia.window.showQuickPick(new Promise(async (resolve) => {
                    await sleep(500);
                    resolve(['foo' + Math.round(Math.random() * 10), 'bar', 'foobar']);
                }), {
                    machOnDescription: true,
                    machOnDetail: true,
                    canPickMany: false,
                    placeHolder: 'Select string:',
                    onDidSelectItem: (item: string) => theia.window.showInformationMessage(`Item ${item} is selected`)
                }).then((val: string | undefined) => {
                    theia.window.showInformationMessage(`Quick Pick Selected: ${val}`);
                });
            })
    );

    context.subscriptions.push(
        theia.commands.registerCommand({
            id: 'quick-pick-object-command',
            label: 'Quick Pick Object Item'
        },
        () => {
            theia.window.showQuickPick<theia.QuickPickItem>(new Promise(async (resolve) => {
                await sleep(500);
                resolve([
                    {
                        label: 'foo' + Math.round(Math.random() * 10),
                        description: 'foo description',
                        detail: 'foo detail'
                    },
                    {
                        label: 'bar',
                        description: 'bar description',
                        detail: 'bar detail'
                    },
                    {
                        label: 'foobar',
                        description: 'foobar description',
                        detail: 'foobar detail',
                        picked: true
                    }
                ]);
            }), {
                machOnDescription: true,
                machOnDetail: true,
                canPickMany: false,
                placeHolder: 'Select object:',
                onDidSelectItem: (item: theia.QuickPickItem) => theia.window.showInformationMessage(`Item ${JSON.stringify(item)} is selected`)
            }).then((val: theia.QuickPickItem | undefined) => {
                theia.window.showInformationMessage(`Quick Pick Object Selected: ${JSON.stringify(val)}`);
            });
        })
    );
}

function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function stop() {
}
