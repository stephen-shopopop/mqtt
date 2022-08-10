import { Color, logger } from '@stephen-shopopop/logger'

const debug = logger('main', Color.Cyan)

export function hello (name: string): string {
  return 'Welcome to ' + name
}

debug(hello(' MQTT DEMO'))
