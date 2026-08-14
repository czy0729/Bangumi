/*
 * @Author: czy0729
 * @Date: 2026-08-14 17:39:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 17:41:02
 */
import * as colors from '@styles/colors'

const isColorString = (value: unknown): value is string => typeof value === 'string'

/**
 * 静态字面量断言没有意义 (改源码就要同步改测试)。
 * 这里只测「不变量 / 派生关系」, 任何一项被破坏都代表真实 bug:
 *  - 亮暗配色必须成对出现, 否则深色模式某个色会回退 undefined
 *  - Raw 必须能从源色解析出来, 否则透明通道拼接会错
 *  - 派生色必须与源色保持一致的拼接规则
 *  - 深黑覆盖只能覆盖 dark 模式已存在的色
 *  - 所有颜色字符串必须符合 rgb/rgba/hex 格式
 */
describe('colors 亮暗成对', () => {
  it('每个 dark 色 (_ 前缀) 都有对应的 light 色', () => {
    for (const key of Object.keys(colors)) {
      if (
        !key.startsWith('_color') ||
        key.startsWith('_colorDarkMode') ||
        key.startsWith('_colorThemeDeepDark') ||
        key === '_colorTitleRaw'
      ) {
        continue
      }
      const lightKey = key.slice(1)
      expect(lightKey in colors).toBe(true)
    }
  })

  it('dark 层级色是特例, 不需要 light 对应', () => {
    expect('colorDarkModeLevel1' in colors).toBe(false)
    expect('colorDarkModeLevel2' in colors).toBe(false)
  })
})

describe('colors Raw 派生', () => {
  const rawKeys = Object.keys(colors).filter(key => key.endsWith('Raw'))

  it('所有 Raw 都能从源色解析出来', () => {
    for (const key of rawKeys) {
      if (key === '_colorTitleRaw') continue
      const sourceKey = key.replace(/Raw$/, '')
      const source = (colors as Record<string, unknown>)[sourceKey]
      const raw = (colors as Record<string, unknown>)[key]
      if (!isColorString(source)) continue
      const parsed = source.match(/\d+/g) as unknown
      expect(raw).toEqual(parsed)
    }
  })

  it('dark 白字 Raw 固定为 255,255,255', () => {
    expect(colors._colorTitleRaw).toEqual([255, 255, 255])
  })
})

describe('colors 派生透明通道', () => {
  it('light 色由源色 Raw 拼出 0.1 透明度', () => {
    expect(colors.colorSuccessLight).toBe(`rgba(${colors.colorSuccessRaw.join()}, 0.1)`)
    expect(colors.colorWarningLight).toBe(`rgba(${colors.colorWarningRaw.join()}, 0.1)`)
  })

  it('colorIconPlain 由白 Raw 拼出 0.88 透明度', () => {
    expect(colors.colorIconPlain).toBe(`rgba(${colors.colorPlainRaw.join()}, 0.88)`)
  })
})

describe('colors 深黑覆盖', () => {
  it('深黑只覆盖 dark 模式已存在的色', () => {
    const deepDarkKeys = Object.keys(colors._colorThemeDeepDark)
    for (const key of deepDarkKeys) {
      const darkKey = `_color${key.slice(5)}`
      expect(darkKey in colors).toBe(true)
    }
  })

  it('深黑覆盖的层级/白/灰 关键色', () => {
    expect(colors._colorThemeDeepDark.colorDarkModeLevel1).toBe('rgb(32, 32, 32)')
    expect(colors._colorThemeDeepDark.colorPlain).toBe('rgb(0, 0, 0)')
    expect(colors._colorThemeDeepDark.colorBg).toBe('rgb(24, 24, 24)')
  })
})

describe('colors 格式合法性', () => {
  it('所有颜色字符串符合 rgb/rgba/hex 格式', () => {
    const colorStringKeys = Object.keys(colors).filter(key => {
      const value = (colors as Record<string, unknown>)[key]
      return isColorString(value) && !key.endsWith('Raw')
    })
    expect(colorStringKeys.length).toBeGreaterThan(0)

    for (const key of colorStringKeys) {
      const value = (colors as Record<string, unknown>)[key] as string
      const isRgb = /^rgba?\([\d\s,.]+\)$/.test(value)
      const isHex = /^#[0-9a-fA-F]{3,6}$/.test(value)
      expect(isRgb || isHex).toBe(true)
    }
  })
})
