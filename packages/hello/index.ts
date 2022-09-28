import { logger } from '@stephen-shopopop/logger'

const debug = logger('Hello')

export function hello (name: string): string {
  return 'Welcome to ' + name
}

debug(hello(' MQTT DEMO'))
