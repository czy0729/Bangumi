/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 10:30:00
 */
import { StyleSheet } from 'react-native'
import { _ } from '@stores'
import {
  colors,
  getHeaderFixed,
  getHeaderTitleAlign,
  getHeaderTitleStyle,
  HEADER_TRANSITION_HEIGHT
} from '../utils'

// 项目 react-native mock 的 flatten 是恒等函数, 测试内补齐真实合并逻辑
jest.spyOn(StyleSheet, 'flatten').mockImplementation(((style: unknown) => {
  if (style === null || typeof style !== 'object') return undefined
  if (!Array.isArray(style)) return style
  return Object.assign({}, ...style.filter(item => item != null))
}) as typeof StyleSheet.flatten)

describe('header-v2/utils', () => {
  it('getHeaderTitleAlign 未传时默认居中', () => {
    expect(getHeaderTitleAlign(undefined, false)).toBe('center')
    expect(getHeaderTitleAlign(undefined, true)).toBe('center')
  })

  it('getHeaderTitleAlign 手机保留传入值', () => {
    expect(getHeaderTitleAlign('left', false)).toBe('left')
  })

  it('getHeaderTitleAlign 平板固定居中', () => {
    expect(getHeaderTitleAlign('left', true)).toBe('center')
  })

  it('getHeaderTitleStyle 手机返回原样式引用', () => {
    const style = { marginLeft: 10 }
    expect(getHeaderTitleStyle(style, false)).toBe(style)
  })

  it('getHeaderTitleStyle 平板追加右侧留白', () => {
    expect(getHeaderTitleStyle({ marginLeft: 10 }, true)).toEqual({
      marginLeft: 10,
      paddingRight: 0
    })
  })

  it('getHeaderTitleStyle 平板无样式时仅留白', () => {
    expect(getHeaderTitleStyle(undefined, true)).toEqual({ paddingRight: 0 })
  })

  it('HEADER_TRANSITION_HEIGHT 渐显阈值为 32', () => {
    expect(HEADER_TRANSITION_HEIGHT).toBe(32)
  })

  it('colors.Subject 暗色恒白, 亮色随 fixed 黑白切换', () => {
    expect(colors.Subject?.(false)).toBe('#fff')
    expect(colors.Subject?.(true)).toBe(_.isDark ? '#fff' : '#000')
  })

  it('colors.Tinygrail 恒为固定主题色', () => {
    expect(colors.Tinygrail?.(false)).toBe(_.colorTinygrailPlain)
    expect(colors.Tinygrail?.(true)).toBe(_.colorTinygrailPlain)
  })

  it('getHeaderFixed 状态未跨越阈值时返回 null', () => {
    expect(getHeaderFixed(0, false)).toBeNull()
    expect(getHeaderFixed(HEADER_TRANSITION_HEIGHT, false)).toBeNull()
    expect(getHeaderFixed(HEADER_TRANSITION_HEIGHT + 1, true)).toBeNull()
  })

  it('getHeaderFixed 跨越阈值时返回目标状态', () => {
    expect(getHeaderFixed(HEADER_TRANSITION_HEIGHT + 1, false)).toBe(true)
    expect(getHeaderFixed(0, true)).toBe(false)
  })
})
