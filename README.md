# Theia plugin yeoman generator
A [Yeoman](yeoman.io) generator that scaffolds a project structure for developing plug-ins to the [Theia IDE](https://github.com/theia-ide/theia).

To use it, install yo and then generator

```
npm install -g yo @theia/generator-plugin
```

To create a sample project with a Theia plugin, run

```
yo @theia/plugin
```

For configuration options, see
```
yo @theia/plugin --help 
```

## Developer

In order to try/develop this generator, let assume there is no module `@theia/generator-plugin` installed at global state.

Then, compile this project by using
```
yarn
```

You only have to use
```
yo @theia/plugin
```

to try your newly version that you've compiled

## License

[EPL-2.0](LICENSE)
