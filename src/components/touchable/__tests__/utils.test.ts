/*
 * @Author: czy0729
 * @Date: 2026-09-02 23:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 00:43:32
 */
import { defaultHitSlop, separateStyles } from '../utils'

import type { ViewStyle } from 'react-native'

describe('separateStyles', () => {
  it('布局属性移入 containerStyle, 其余留在 style', () => {
    const { containerStyle, style } = separateStyles({
      width: 100,
      height: 50,
      marginTop: 8,
      backgroundColor: 'red'
    })
    expect(containerStyle).toMatchObject({ width: 100, height: 50, marginTop: 8 })
    expect(style).toMatchObject({ width: 100, height: 50, backgroundColor: 'red' })
    expect(style).not.toHaveProperty('marginTop')
    expect(style).not.toHaveProperty('margin')
  })

  it('数值 width/height 同时保留在 containerStyle 与 style', () => {
    const { containerStyle, style } = separateStyles({ width: 32, height: 30 })
    expect(containerStyle.width).toBe(32)
    expect(containerStyle.height).toBe(30)
    expect(style.width).toBe(32)
    expect(style.height).toBe(30)
  })

  it('非数值 width/height 只保留在 containerStyle', () => {
    const { containerStyle, style } = separateStyles({ width: '100%', height: 'auto' })
    expect(containerStyle.width).toBe('100%')
    expect(containerStyle.height).toBe('auto')
    expect(style.width).toBeUndefined()
    expect(style.height).toBeUndefined()
  })

  it('数组样式后者覆盖前者', () => {
    const { containerStyle, style } = separateStyles([
      { margin: 10, backgroundColor: 'red' },
      { marginTop: 16, backgroundColor: 'blue' }
    ])
    expect(containerStyle).toMatchObject({ margin: 10, marginTop: 16 })
    expect(style).toEqual({ backgroundColor: 'blue' })
  })

  it('深层嵌套数组同样展开合并', () => {
    const { containerStyle, style } = separateStyles<ViewStyle>([
      [{ borderRadius: 8 }],
      { width: 32, borderRadius: 4 }
    ])
    expect(containerStyle).toMatchObject({ borderRadius: 4, width: 32 })
    expect(style).toEqual({ width: 32 })
  })

  it('边框圆角与 overflow 归入 containerStyle', () => {
    const { containerStyle, style } = separateStyles({
      overflow: 'hidden',
      borderRadius: 28,
      borderColor: 'red',
      paddingHorizontal: 8
    })
    expect(containerStyle).toMatchObject({
      overflow: 'hidden',
      borderRadius: 28,
      borderColor: 'red'
    })
    expect(style).toEqual({ paddingHorizontal: 8 })
  })

  it('空值返回空 style', () => {
    expect(separateStyles(undefined).style).toEqual({})
    expect(separateStyles(null).style).toEqual({})
    expect(separateStyles(undefined).containerStyle.width).toBeUndefined()
  })
})

describe('defaultHitSlop', () => {
  it('上下与左右成对且为正数', () => {
    expect(defaultHitSlop.top).toBe(defaultHitSlop.bottom)
    expect(defaultHitSlop.left).toBe(defaultHitSlop.right)
    expect(defaultHitSlop.top).toBeGreaterThan(0)
    expect(defaultHitSlop.left).toBeGreaterThan(0)
  })

  it('四边均为数字', () => {
    expect(defaultHitSlop.top).toEqual(expect.any(Number))
    expect(defaultHitSlop.right).toEqual(expect.any(Number))
    expect(defaultHitSlop.bottom).toEqual(expect.any(Number))
    expect(defaultHitSlop.left).toEqual(expect.any(Number))
  })
})
