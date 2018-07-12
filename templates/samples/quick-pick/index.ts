/**
 * Generated using theia-plugin-generator
 */ 
import * as theia from '@theia/plugin';

const disposables: theia.Disposable[] = [];

export function start() {
    disposables.push(
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
                    onDidSelectItem: (item: string) => console.log(`Item ${item} is selected`)
                }).then((val: string | undefined) => {
                    theia.window.showInformationMessage(`Quick Pick Selected: ${val}`);
                });
            })
    );

    disposables.push(
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
                onDidSelectItem: (item: theia.QuickPickItem) => console.log(`Item ${JSON.stringify(item)} is selected`)
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
    while (disposables.length) {
        const disposable = disposables.pop();
        if (disposable) {
            disposable.dispose();
        }
    }
}
