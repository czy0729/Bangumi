/*
 * @Author: czy0729
 * @Date: 2026-08-18 16:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 16:30:00
 */

// 可变的 theme / setting 状态, 便于用例切换
// 工厂函数在模块加载时执行, 通过 getter 延迟读取, 避免闭包引用未初始化变量
global.__textMockStore__ = {
  theme: {
    web: (_webValue, otherValue) => otherValue,
    select: a => a,
    fontStyle: { fontFamily: 'test' },
    fontBoldStyle: { fontWeight: 'bold' },
    colorMain: '#main',
    colorSub: '#sub',
    colorPlain: '#plain',
    __colorPlain__: '__plain__',
    colorPrimary: '#primary',
    colorSuccess: '#success',
    colorWarning: '#warning',
    colorDanger: '#danger',
    colorTitle: '#title',
    colorDesc: '#desc',
    colorIcon: '#icon',
    colorBorder: '#border',
    colorAvatar: '#avatar',
    colorBid: '#bid',
    colorAsk: '#ask',
    colorTinygrailPlain: '#tinygrailPlain',
    colorTinygrailText: '#tinygrailText',
    colorTinygrailIcon: '#tinygrailIcon',
    device: () => 0,
    padIncrease: 2,
    fontSizeAdjust: 0,
    lineHeightRatio: 1.2,
    letterSpacing: 0
  },
  systemStore: {
    setting: { s2t: false, spacing: false }
  }
}

// memoStyles 模拟: 工厂返回缓存的样式对象
global.__textMockStore__.theme.memoStyles = factory => {
  let _styles
  return () => {
    if (!_styles) _styles = factory(global.__textMockStore__.theme)
    return _styles
  }
}

// 预生成 fontSizeXX
for (let i = 6; i <= 30; i += 1) {
  global.__textMockStore__.theme[`fontSize${i}`] = { fontSize: i }
}

jest.mock('@stores', () => ({
  get _() {
    return global.__textMockStore__.theme
  },
  get systemStore() {
    return global.__textMockStore__.systemStore
  }
}))

jest.mock('@constants', () => ({
  IOS: false,
  WEB: false
}))

jest.mock('@utils', () => ({
  setDefaultProps: jest.fn(),
  titleCase: str => (str ? str[0].toUpperCase() + str.slice(1) : str)
}))

jest.mock('@utils/thirdParty/open-cc', () => ({
  s2t: str => `s2t:${str}`
}))

jest.mock('@utils/thirdParty/pangu-lite', () => ({
  spacing: str => `spacing:${str}`
}))

import { Text, TextInput } from 'react-native'

// require 不提升, 确保 global mock store 已初始化后再加载 utils (styles 顶层读 _)
const {
  computedLineHeight,
  formatS2T,
  formatSpacing,
  getTextStyle,
  setComponentsDefaultProps
} = require('../utils')

const mockStore = () => global.__textMockStore__

describe('computedLineHeight', () => {
  it('默认 14 号字返回基于 lineHeightRatio 的行高', () => {
    expect(computedLineHeight()).toBe(16)
  })

  it('指定 lineHeight 数值时直接计算', () => {
    expect(computedLineHeight(14, 18)).toBe(21)
  })

  it('lineHeight 小于等于 2 时视为比例, 取 size 为基数', () => {
    expect(computedLineHeight(14, 1)).toBe(16)
  })

  it('lineHeightIncrease 加入基数', () => {
    expect(computedLineHeight(14, 14, 1)).toBe(18)
  })

  it('小字号 lh 小于等于 2 走比例分支', () => {
    expect(computedLineHeight(1, 1)).toBe(1)
  })
})

describe('formatS2T', () => {
  it('字符串走 s2t 转换', () => {
    expect(formatS2T('abc')).toBe('s2t:abc')
  })

  it('数组递归转换', () => {
    expect(formatS2T(['a', 'b'])).toEqual(['s2t:a', 's2t:b'])
  })

  it('非字符串非数组原样返回', () => {
    const el = { key: 'x' }
    expect(formatS2T(el)).toBe(el)
  })
})

describe('formatSpacing', () => {
  it('字符串走 spacing 转换', () => {
    expect(formatSpacing('abc')).toBe('spacing:abc')
  })

  it('数组递归转换', () => {
    expect(formatSpacing(['a', 'b'])).toEqual(['spacing:a', 'spacing:b'])
  })

  it('非字符串非数组原样返回', () => {
    const el = { key: 'x' }
    expect(formatSpacing(el)).toBe(el)
  })
})

describe('getTextStyle', () => {
  it('默认返回 base + type + fontSize + lineHeight + text', () => {
    expect(getTextStyle({})).toEqual([
      { includeFontPadding: false, textAlignVertical: 'center' },
      { color: '#desc' },
      { fontSize: 14 },
      { lineHeight: 16 },
      { fontFamily: 'test' }
    ])
  })

  it('underline 追加下划线样式', () => {
    const styles = getTextStyle({ underline: true })
    expect(styles.some(style => style.textDecorationLine === 'underline')).toBe(true)
  })

  it('size 变化使用对应 fontSize', () => {
    expect(getTextStyle({ size: 16 })).toContainEqual({ fontSize: 16 })
  })

  it('align 非 left 追加对齐样式', () => {
    const styles = getTextStyle({ align: 'center' })
    expect(styles).toContainEqual({ textAlign: 'center' })
  })

  it('align 为 left 不追加', () => {
    expect(getTextStyle({ align: 'left' })).not.toContainEqual({ textAlign: 'left' })
  })

  it('shadow / shrink / noWrap 追加对应样式', () => {
    const styles = getTextStyle({ shadow: true, shrink: true, noWrap: true })
    expect(styles.some(style => style.textShadowOffset)).toBe(true)
    expect(styles).toContainEqual({ flexShrink: 1 })
    expect(styles).toContainEqual({ whiteSpace: 'nowrap' })
  })

  it('letterSpacing 非 0 时追加', () => {
    mockStore().theme.letterSpacing = 2
    expect(getTextStyle({})).toContainEqual({ letterSpacing: 2 })
    mockStore().theme.letterSpacing = 0
  })

  it('bold 追加加粗样式', () => {
    expect(getTextStyle({ bold: true })).toContainEqual({ fontWeight: 'bold' })
  })

  it('style 追加在 fontFamily 之前', () => {
    const extra = { marginTop: 1 }
    const styles = getTextStyle({ style: extra })
    const fontIndex = styles.findIndex(style => style.fontFamily === 'test')
    expect(styles.indexOf(extra)).toBe(fontIndex - 1)
  })

  it('overrideStyle 最后追加', () => {
    const override = { color: '#override' }
    const styles = getTextStyle({ overrideStyle: override })
    expect(styles[styles.length - 1]).toBe(override)
  })

  it('无引用参数时同参连续调用返回同一数组引用', () => {
    expect(getTextStyle({ type: 'main', size: 14 })).toBe(getTextStyle({ type: 'main', size: 14 }))
  })

  it('带 style 时不走缓存', () => {
    expect(getTextStyle({ style: { marginTop: 1 } })).not.toBe(
      getTextStyle({ style: { marginTop: 1 } })
    )
  })
})

describe('setComponentsDefaultProps', () => {
  it('IOS 或 WEB 为 false 时注入默认字体', () => {
    const setDefaultProps = require('@utils').setDefaultProps
    setComponentsDefaultProps()
    expect(setDefaultProps).toHaveBeenCalledWith(Text, { fontFamily: 'test' })
    expect(setDefaultProps).toHaveBeenCalledWith(TextInput, { fontFamily: 'test' })
  })
})
