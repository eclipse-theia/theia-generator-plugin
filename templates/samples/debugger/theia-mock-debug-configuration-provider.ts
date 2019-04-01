<%- include('../../base/ts-header.ts'); %>

import * as theia from '@theia/plugin';

export const THEIA_MOCK_DEBUG = 'theia-mock-debug';

export class TheiaMockDebugConfigurationProvider implements theia.DebugConfigurationProvider {
    async resolveDebugConfiguration(
        folder: theia.WorkspaceFolder | undefined,
        debugConfiguration: theia.DebugConfiguration,
        token?: theia.CancellationToken): Promise<theia.DebugConfiguration> {

        // overrides configuration property to be sure that debuggers stops at the very fist line
        debugConfiguration.request = 'launch';
        debugConfiguration.stopOnEntry = true;

        return debugConfiguration;
    }
}
