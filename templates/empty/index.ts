<%- include('../base/ts-header.ts'); %>
import * as theia from '@theia/plugin';

export function start(context: theia.PluginContext) {
    console.log(theia.window.state);
}

export function stop() {

}
