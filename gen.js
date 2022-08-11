#!/usr/bin/env node

const { execSync } = require('child_process')
const readline = require('readline')
const util = require('util')
const fs = require('fs-extra')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const question = util.promisify(rl.question).bind(rl)

// eslint-disable-next-line no-extend-native
String.prototype.toKebabCase = function () {
  return this.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => '-' + chr).trim()
}

// main
async function main () {
  const scope = await question('Enter Scope (default: @stephen-shopopop):') || '@stephen-shopopop'
  const scopeName = scope.toKebabCase()

  const name = await question('What is the name of the package ? ')
  const packageName = name.toKebabCase()

  const cmd = `npm init --scope=${scopeName} -y -w ./packages/${packageName}`
  execSync(cmd.toString(), {
    cwd: __dirname,
    stdio: 'inherit'
  })

  await fs.copy('./packages/hello/.npmignore', `./packages/${packageName}/.npmignore`)
  await fs.copy('./packages/hello/tsconfig.pkg.json', `./packages/${packageName}/tsconfig.pkg.json`)
  await fs.copy('./packages/hello/index.ts', `./packages/${packageName}/index.ts`)
  await fs.copy('./packages/hello/index.test.ts', `./packages/${packageName}/index.test.ts`)
  await fs.copy('./packages/hello/readme.md', `./packages/${packageName}/readme.md`)

  const pkg = require(`./packages/${packageName}/package.json`)
  pkg.types = 'dist/index.d.ts'
  pkg.main = 'dist/index.js'
  pkg.scripts = {
    start: 'node dist/index.js',
    dev: 'ts-node index.ts',
    compile: 'rimraf dist/* && tsc -p tsconfig.pkg.json'
  }
  pkg.description = ''

  await fs.writeJSON(`./packages/${packageName}/package.json`, pkg, { spaces: 2 })
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.warn(error)
    process.exitCode(1)
  })
