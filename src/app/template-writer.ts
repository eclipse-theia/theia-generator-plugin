/*********************************************************************
* Copyright (c) 2018 Red Hat, Inc.
*
* This program and the accompanying materials are made
* available under the terms of the Eclipse Public License 2.0
* which is available at https://www.eclipse.org/legal/epl-2.0/
*
* SPDX-License-Identifier: EPL-2.0
**********************************************************************/

import fs = require("fs");
import Base = require('yeoman-generator');

export class TemplateWriter {

    constructor(private readonly generator: Base) {
    }

    write(params: PluginParams): void {
        this.writeBase(params);
        switch (params.template) {
            case 'hello-world':
                this.writeMain('hello-world.ts', params);
                break;
            case 'skeleton':
                this.writeMain('empty/index.ts', params);
                break;
            case 'samples':
                this.writeSample(params.sample!, params);
                break;
        }
    }

    private writeSample(sample: string, params: PluginParams): void {
        if (!sample) {
            sample = (<any>this.generator.options).sample;
        }
        const path = 'samples/' + sample + '/';

        this.writeMain(path + 'index.ts', params);
        if (fs.readdirSync(this.generator.templatePath(path)).length > 1) {
            try {
                this.generator.fs.copyTpl(
                    this.generator.templatePath(path) + '!(index.ts)',
                    this.generator.destinationPath('src'),
                    { params: params },
                    {},
                    { globOptions: { dot: true } }
                );
            } catch (e) {
                console.debug(e);
            }
        }
    }

    private writeMain(indexPath: string, params: PluginParams): void {
        this.generator.fs.copyTpl(
            this.generator.templatePath(indexPath),
            this.generator.destinationPath('src/' + params.pluginName + '-' + params.pluginType + '-plugin.ts'),
            { params: params }
        );
    }

    private writeBase(params: PluginParams): void {
        this.generator.fs.copyTpl(
            this.generator.templatePath('base/package.json'),
            this.generator.destinationPath('package.json'),
            { params: params }
        );
        this.generator.fs.copyTpl(
            this.generator.templatePath('base/gitignore'),
            this.generator.destinationPath('.gitignore'),
            { params: params }
        );
        this.generator.fs.copyTpl(
            this.generator.templatePath('base/README.md'),
            this.generator.destinationPath('README.md'),
            { params: params }
        );

        this.generator.fs.copyTpl(
            this.generator.templatePath('base/tsconfig.json'),
            this.generator.destinationPath('tsconfig.json'),
            { params: params }
        );

        this.generator.fs.copyTpl(
            this.generator.templatePath('base/tsfmt.json'),
            this.generator.destinationPath('tsfmt.json'),
            { params: params }
        );

        if (params.isFrontend) {
            this.generator.fs.copyTpl(
                this.generator.templatePath('base/webpack.config.js'),
                this.generator.destinationPath('webpack.config.js'),
                { params: params }
            );
        }

        if (params.license.id !== 'none') {
            this.generator.fs.copyTpl(
                this.generator.templatePath('licenses/' + params.license.id + '/license'),
                this.generator.destinationPath('LICENSE'),
                { params: params }
            );
        }
    }
}

export interface PluginParams {
    author: string;
    publisher: string;
    version: string;
    license: License;
    creationYear: string;
    pluginName: string;
    packageName: string;
    pluginType: string;
    githubURL: string;
    frontendModuleName: string;
    example: boolean;
    theiaVersion: string;
    pluginSourcePath: string;
    pluginDistPath: string;
    isFrontend: boolean;
    isBackend: boolean;
    template: string;
    sample?: string;
}

export interface License {
    id: string; // SPDX license id
    header: string;
}
