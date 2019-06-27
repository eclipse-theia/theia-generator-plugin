<%- include('../../base/ts-header.ts'); %>

import * as theia from '@theia/plugin';
import * as path from 'path';

export function start(context: theia.PluginContext) {
    const JAR_PATH = path.resolve(__dirname, '..', 'lsp4xml', 'org.eclipse.lsp4xml-all.jar');
    const XML_LS_ID = 'xml';

    const xmlLanguageServerInfo: theia.LanguageServerInfo = {
        id: XML_LS_ID,
        name: 'XML',
        globPatterns: ['**/*.xml'],
        command: 'java',
        args: ['-jar', JAR_PATH]
    }

    context.subscriptions.push(theia.languageServer.registerLanguageServerProvider(xmlLanguageServerInfo));

    registerCommands(xmlLanguageServerInfo, context);
}

function registerCommands(lsInfo: theia.LanguageServerInfo, context: theia.PluginContext): void {
    const startCommand = {
        id: 'Start XML LS',
        label: "XML: Start XML Language Server"
    };

    const stopCommand = {
        id: 'Stop XML LS',
        label: "XML: Stop XML Language Server"
    };

    context.subscriptions.push(
        theia.commands.registerCommand(startCommand, (...args: any[]) => {
            context.subscriptions.push(theia.languageServer.registerLanguageServerProvider(lsInfo));
        }),
        theia.commands.registerCommand(stopCommand, (...args: any[]) => {
            theia.languageServer.stop(lsInfo.id);
        })
    );
}

export function stop() {
}
