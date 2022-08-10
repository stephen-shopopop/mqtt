import { Console } from 'console'

enum Color {
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m'
}

const console = new Console({ stdout: process.stdout, stderr: process.stderr })

export const logger = (...data: any): void => console.info(Color.Yellow, `[${new Date().toISOString()} - Broker]`, ...data, Color.Black)
