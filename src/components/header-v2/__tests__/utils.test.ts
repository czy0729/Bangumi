/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 10:30:00
 */
import { StyleSheet } from 'react-native'
import { getHeaderTitleAlign, getHeaderTitleStyle } from '../utils'

// 项目 react-native mock 的 flatten 是恒等函数, 测试内补齐真实合并逻辑
jest.spyOn(StyleSheet, 'flatten').mockImplementation(
  ((style: unknown) => {
    if (style === null || typeof style !== 'object') return undefined
    if (!Array.isArray(style)) return style
    return Object.assign({}, ...style.filter(item => item != null))
  }) as typeof StyleSheet.flatten
)

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
})
