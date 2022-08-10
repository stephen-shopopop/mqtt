[![Minimal node version](https://img.shields.io/static/v1?label=node&message=%3E=16.15&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Minimal npm version](https://img.shields.io/static/v1?label=npm&message=%3E=8.5.5&logo=npm&color)](https://github.com/npm/cli/releases)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/stephen-shopopop/node-ts/graphs/commit-activity)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![macOS](https://svgshare.com/i/ZjP.svg)](https://svgshare.com/i/ZjP.svg)
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/)

# NODE - MQTT

## Description

demonstration nodejs MQTT

## Installation nodejs via nvm (node version manager)

- [macos/linux](https://github.com/nvm-sh/nvm) or use Makefile command: ```make nvm```
- [windows](https://github.com/coreybutler/nvm-windows)

## Docs

### Summary

Client MQTT standalone:

- [mqttx](https://mqttx.app)

---
## Contributing

Run package project:

```shell
npm run start -w=@stephen-shopopop/hello

// or run with ts-node
npm run dev -w=@stephen-shopopop/hello
```

Add package in workspace:

```shell
npm init --scope=@stephen-shopopop -y -w ./packages/hello
```

Add dependencies in package:

```shell
npm install abbrev -w @stephen-shopopop/hello

// uninstall
npm uninstall abbrev -w @stephen-shopopop/hello
```

Run test only in package:

```shell
npm test --packages/hello
```

Add reference package (npm recommended):

```shell
npm i ./packages/hello -w packages/mypackage
```

Add reference package (better reference):

```json
"dependencies": {
  "@stephen-shopopop/hello": "*"
}
```

1. npm start - Start project.
2. npm run test -  Run tests.
3. npm run build - Build each packages
4. npm run build:extra  - Build each package in dist isolate
5. npm run lint - Run lint
6. npm run lint:fix - Run lint autofix
7. npm run typecheck - Run typecheck
8. npm run release - Tag release
9. npm run prerelease - Tag pre release
10. npm run fix - Tag fix

### Package maintenance

A modern cli tool that keeps your deps fresh

```bash
npx taze -r

// major
npx taze major -r
```
