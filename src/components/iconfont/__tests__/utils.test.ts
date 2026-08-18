/*
 * @Author: czy0729
 * @Date: 2026-08-19 07:36:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 07:36:42
 */
import { getAppIconName, getIconFamily } from '../utils'

describe('iconfont/utils', () => {
  it('getIconFamily 判定 md-/ios-/自定义家族', () => {
    expect(getIconFamily('md-heart')).toBe('material')
    expect(getIconFamily('ios-heart')).toBe('ionicons')
    expect(getIconFamily('home')).toBe('app')
    expect(getIconFamily('')).toBe('app')
  })

  it('getAppIconName 自动补 icon- 前缀', () => {
    expect(getAppIconName('home')).toBe('icon-home')
    expect(getAppIconName('icon-home')).toBe('icon-home')
  })
})
