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
module.exports = class TheiaPlugin extends Base {

    private params!: {
        author: string;
        publisher: string;
        version: string;
        license: string;
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
    };

    constructor(args: string | string[], options: any) {
        super(args, options);
        this.argument('pluginName', {
            type: String,
            required: false,
        });

        this.option('pluginType', {
            alias: 't',
            description: 'Type of the plugin [backend, frontend]',
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
            (this.options as any).pluginName = answers.name
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
            (this.options as any).pluginType = answers.pluginType
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
        const pluginName = (options.pluginName as string).replace(/\W/g, '-');
        const pluginType = options.pluginType as string;
        const packageName = pluginName + '-plugin';
        const publisher = options.publisher ? options.publisher as string : 'theia';
        const frontendModuleName = `${publisher}_${packageName}`.replace(/\W/g, '_');
        this.params = {
            author: options.author,
            publisher: publisher,
            version: options.version,
            license: options.license,
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
            isBackend: (options.pluginType === 'backend')
        };
        options.params = this.params;

    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            { params: this.params }
        )
        this.fs.copyTpl(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('hello-world.ts'),
            this.destinationPath('src/' + this.params.pluginName + '-' + this.params.pluginType + '-plugin.ts'),
            { params: this.params }
        );
        if (this.params.isFrontend) {
            this.fs.copyTpl(
                this.templatePath('webpack.config.js'),
                this.destinationPath('webpack.config.js'),
                { params: this.params }
            );
        }
    }

    install() {
        this.log('Installing dependencies with yarn...');
        const result = this.spawnCommandSync('yarn', [], {
            cwd: (this.options as any).cwd,
            stdio: 'pipe'
        });
        if (result.err) {
            this.log('' + result.stderr);
        } else {
            this.log('' + result.stdout);
        }

    }

}
