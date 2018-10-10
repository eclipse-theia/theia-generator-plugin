/*********************************************************************
* Copyright (c) 2018 Red Hat, Inc.
*
* This program and the accompanying materials are made
* available under the terms of the Eclipse Public License 2.0
* which is available at https://www.eclipse.org/legal/epl-2.0/
*
* SPDX-License-Identifier: EPL-2.0
**********************************************************************/

import yosay = require('yosay');
import Base = require('yeoman-generator');
import path = require('path');
import tw = require('./template-writer');

module.exports = class TheiaPlugin extends Base {

    static const SUPPORTED_LICENSES = [
        'MIT',
        'EPL-2.0'
    ];

    private params!: tw.PluginParams;
    templateWriter: tw.TemplateWriter;

    constructor(args: string | string[], options: any) {
        super(args, options);
        this.templateWriter = new tw.TemplateWriter(this);
        this.argument('pluginName', {
            type: String,
            required: false,
        });

        this.option('pluginType', {
            alias: 't',
            description: 'Type of the plug-in [backend, frontend]',
            type: String,
        });

        this.option('author', {
            alias: 'a',
            description: 'The plug-in\'s author',
            type: String
        });
        this.option('publisher', {
            alias: 'p',
            description: 'The publisher ID',
            type: String
        });
        this.option('version', {
            alias: 'v',
            description: 'The plug-in\'s version',
            type: String,
            default: '0.0.1'
        });
        this.option('description', {
            alias: 'd',
            description: 'The plug-in\'s description',
            type: String,
        });
        this.option('license', {
            alias: 'l',
            description: 'The plug-in\'s license',
            type: String
        });
        this.option('githubURL', {
            alias: 'u',
            description: 'The plug-in\'s Github URL',
            type: String
        });

        this.option('theia-version', {
            alias: 't',
            description: 'The version of Theia to use',
            type: String,
            default: 'next'
        });

        this.option('template', {
            alias: 'tpl',
            description: 'Generate from template',
            type: String,
        });
        this.option('sample', {
            alias: 's',
            description: 'Sample type',
            type: String
        });
    }

    path() {
        this.sourceRoot(__dirname + '/../../templates');
    }

    getName() {

    }

    async doPrompt() {

        if (!(this.options as any).pluginName) {
            const answers = await this.prompt([{
                type: 'input',
                name: 'name',
                message: "What is the plug-in's name?",
                default: this.appname // Default to current folder name
            }]);
            (this.options as any).pluginName = answers.name;
        }

        if (!(this.options as any).pluginType) {

            const answers = await this.prompt([{
                type: 'list',
                name: 'pluginType',
                message: 'What type of plug-in do you want?',
                choices: [
                    {
                        name: 'Backend plug-in, it will run on the server side.',
                        value: 'backend'
                    },
                    {
                        name: 'Frontend plug-in, it will run on the browser side.',
                        value: 'frontend'
                    }
                ]
            }]);
            (this.options as any).pluginType = answers.pluginType;
        }

        if (!(this.options as any).template) {
            const answers = await this.prompt([{
                type: 'list',
                name: 'template',
                message: 'Please, choose a template:',
                choices: [
                    {
                        name: 'Hello World plug-in',
                        value: 'hello-world'
                    },
                    {
                        name: 'Skeleton plug-in',
                        value: 'skeleton'
                    },
                    {
                        name: 'Samples',
                        value: 'samples'
                    }
                ]
            }]);
            (this.options as any).template = answers.template;
        }

        if (!(this.options as any).sample && (this.options as any).template === 'samples') {
            const answers = await this.prompt([{
                type: 'list',
                name: 'sample',
                message: 'Please, choose the sample:',
                choices: [
                    {
                        name: 'Commands sample',
                        value: 'commands'
                    },
                    {
                        name: 'Information Message sample',
                        value: 'message-information'
                    },
                    {
                        name: 'Quick Pick sample',
                        value: 'quick-pick'
                    },
                    {
                        name: 'Status Bar item sample',
                        value: 'status-bar'
                    }
                ]
            }]);
            (this.options as any).sample = answers.sample;
        }

    }

    prompting() {
        this.log(
            yosay(`Welcome to the 'Theia Plug-in' generator!`)
        );

        return Promise.resolve(this.doPrompt());

    }

    configuring() {
        const options = this.options as any;
        const creationYear = new Date().getFullYear().toString();
        const pluginName = (options.pluginName as string).replace(/\W/g, '-');
        const pluginType = options.pluginType as string;
        const packageName = pluginName + '-plugin';
        const publisher = options.publisher ? options.publisher as string : 'theia';
        const frontendModuleName = `${publisher}_${packageName}`.replace(/\W/g, '_');

        let licenseId = options.license;
        let header: string;
        if (!licenseId || TheiaPlugin.SUPPORTED_LICENSES.indexOf(licenseId) === -1) {
            if (licenseId) {
                console.warn('License ID "' + licenseId + '" is not supported.');
            } else {
                console.warn('License is not specified. You can do it via --license parameter.');
            }
            licenseId = 'none';
            header = '';
        } else {
            header = this.fs.read(path.resolve(__dirname, '../../', 'templates/licenses/', licenseId, 'license-header'));
            header = header.replace(/{author}/g, options.author);
            header = header.replace(/{date}/g, creationYear);
        }

        this.params = {
            author: options.author,
            publisher: publisher,
            version: options.version,
            license: { id: licenseId, header: header },
            creationYear: creationYear,
            pluginName: pluginName,
            packageName: packageName,
            pluginType: pluginType,
            githubURL: options.githubURL,
            frontendModuleName: frontendModuleName,
            example: options.example,
            theiaVersion: options["theia-version"],
            pluginSourcePath: pluginName + '-' + pluginType + '-plugin.ts',
            pluginDistPath: pluginName + '-' + pluginType + '-plugin.js',
            isFrontend: (options.pluginType === 'frontend'),
            isBackend: (options.pluginType === 'backend'),
            template: options.template,
            sample: options.sample,
            distFolder: pluginName,
        };
        options.params = this.params;

    }

    writing() {
        this.templateWriter.write(this.params);
    }

    install() {
        this.log('Installing dependencies with yarn...');
        const result = this.spawnCommandSync('yarn', [], {
            cwd: this.params.distFolder, /* use the generated plugin-path */
            stdio: 'pipe'
        });

        if (result.err) {
            this.log('' + result.stderr);
        } else {
            this.log('' + result.stdout);
        }

    }

};
