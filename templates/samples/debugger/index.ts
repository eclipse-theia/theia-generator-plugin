<%- include('../../base/ts-header.ts'); %>

import * as theia from '@theia/plugin';
import { THEIA_MOCK_DEBUG, TheiaMockDebugConfigurationProvider } from './theia-mock-debug-configuration-provider';

export function start(context: theia.PluginContext) {
    theia.debug.registerDebugConfigurationProvider(THEIA_MOCK_DEBUG, new TheiaMockDebugConfigurationProvider());
}

export function stop() { }
