/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 09:00:14
 */
import { getButtonStyles } from '../utils'

// 仅覆盖 getButtonStyles 实际读取的样式键，供单测断言引用
const styles = {
  button: { borderWidth: 0 },
  text: { fontSize: 14 },
  shadow: { borderWidth: 1 },
  plain: { backgroundColor: '#fff' },
  textPlain: { color: '#000' },
  radius: { borderRadius: 2 },
  sm: { width: 32 },
  md: { width: '100%' },
  textSm: { fontSize: 12 },
  textXs: { fontSize: 9 }
} as any

describe('getButtonStyles', () => {
  it('默认 plain/md 含基础、类型、圆角与尺寸样式', () => {
    const { wrapStyle, textStyle, textBold } = getButtonStyles(styles, {}, undefined)
    expect(wrapStyle).toContain(styles.button)
    expect(wrapStyle).toContain(styles.plain)
    expect(wrapStyle).toContain(styles.radius)
    expect(wrapStyle).toContain(styles.md)
    expect(textStyle).toContain(styles.text)
    expect(textStyle).toContain(styles.textPlain)
    expect(textBold).toBe(false)
  })

  it('外部 style 会追加进容器样式', () => {
    const custom = { opacity: 0.5 }
    const { wrapStyle } = getButtonStyles(styles, { style: custom }, undefined)
    expect(wrapStyle).toContain(custom)
  })

  it('size 为 sm 且文字较短时文字加粗并选用 textSm', () => {
    const { wrapStyle, textStyle, textBold } = getButtonStyles(styles, { size: 'sm' }, 'OK')
    expect(wrapStyle).toContain(styles.sm)
    expect(textBold).toBe(true)
    expect(textStyle).toContain(styles.textSm)
    expect(textStyle).not.toContain(styles.textXs)
  })

  it('size 为 sm 且文字长度 ≥ 5 时降级为 textXs', () => {
    const { textStyle, textBold } = getButtonStyles(styles, { size: 'sm' }, '收藏收藏收')
    expect(textBold).toBe(true)
    expect(textStyle).toContain(styles.textXs)
  })

  it('size 为 sm 且无文字时仍加粗并选用 textSm', () => {
    const { textStyle, textBold } = getButtonStyles(styles, { size: 'sm' }, undefined)
    expect(textBold).toBe(true)
    expect(textStyle).toContain(styles.textSm)
  })

  it('radius 为 false 时不加圆角样式', () => {
    const { wrapStyle } = getButtonStyles(styles, { radius: false }, undefined)
    expect(wrapStyle).not.toContain(styles.radius)
  })
})
