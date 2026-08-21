/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import { EXIT_THRESHOLD } from '../ds'
import { getBackAndroidResult } from '../utils'

describe('getBackAndroidResult', () => {
  it('非根 Tab（index 不为 0）交给路由', () => {
    expect(getBackAndroidResult(1, 0, 1000)).toBe('route')
    expect(getBackAndroidResult(2, 500, 1000)).toBe('route')
  })

  it('根 Tab 但取不到 index（undefined）交给路由', () => {
    expect(getBackAndroidResult(undefined, 0, 1000)).toBe('route')
  })

  it('根 Tab 且无上次退后记录时提示再按一次', () => {
    expect(getBackAndroidResult(0, 0, 1000)).toBe('prompt')
  })

  it('根 Tab 且在阈值内再次退后直接退出', () => {
    const last = 1000
    expect(getBackAndroidResult(0, last, last + EXIT_THRESHOLD - 1)).toBe('exit')
  })

  it('根 Tab 且恰好等于阈值边界时退出', () => {
    const last = 1000
    expect(getBackAndroidResult(0, last, last + EXIT_THRESHOLD)).toBe('exit')
  })

  it('根 Tab 但超出阈值时重新提示', () => {
    const last = 1000
    expect(getBackAndroidResult(0, last, last + EXIT_THRESHOLD + 1)).toBe('prompt')
  })
})
