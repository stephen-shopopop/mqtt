import { Console } from 'console'

export type Handle = (...value: any) => void

export enum Color {
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

export function logger (name: string, color: Color): Handle {
  return (...data: any): void =>
    console.log(color, `[${new Date().toISOString()} - ${name}]`, ...data, Color.Black)
}
