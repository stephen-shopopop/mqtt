import { describe, expect, test } from '@jest/globals'
import { Color, logger } from './index'

describe('[index/debug] debug()', () => {
  test.each`
    string | expected
    ${'Shopopop'} | ${'Function'}
  `('returns $expected when debug $string with blue', ({ string }) => {
    expect(typeof logger(string, Color.Blue) === 'function').toBeTruthy()
  })
})
