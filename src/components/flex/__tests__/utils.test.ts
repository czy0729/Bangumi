/*
 * @Author: czy0729
 * @Date: 2026-09-11 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 00:00:00
 */
import { flexItemStyle, flexStyle, getFlexValue } from '../utils'

describe('flex/utils', () => {
  it('getFlexValue 映射 CSS 标准值', () => {
    expect(getFlexValue('start')).toBe('flex-start')
    expect(getFlexValue('end')).toBe('flex-end')
    expect(getFlexValue('between')).toBe('space-between')
    expect(getFlexValue('around')).toBe('space-around')
    expect(getFlexValue('center')).toBe('center')
    expect(getFlexValue(undefined)).toBe(undefined)
  })

  it('flexStyle 默认值与 Flex 组件一致', () => {
    expect(flexStyle()).toEqual({
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center'
    })
  })

  it('flexStyle 支持 direction / wrap / justify / align', () => {
    expect(
      flexStyle({
        direction: 'column',
        wrap: 'wrap',
        justify: 'between',
        align: 'end'
      })
    ).toEqual({
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    })
  })

  it('flexItemStyle 默认 flex 为 1', () => {
    expect(flexItemStyle()).toEqual({ flex: 1 })
    expect(flexItemStyle({ flex: 2 })).toEqual({ flex: 2 })
  })
})

describe('flex/utils WEB', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('@constants', () => ({ WEB: true }))
  })

  afterEach(() => {
    jest.dontMock('@constants')
    jest.resetModules()
  })

  it('WEB 下补 zIndex、wrap 的 maxWidth 与 Flex.Item 的 width', () => {
    const { flexItemStyle: webFlexItemStyle, flexStyle: webFlexStyle } =
      require('../utils') as typeof import('../utils')

    const style = webFlexStyle() as Record<string, unknown>
    expect(style.zIndex).toBe('unset')
    expect(style.maxWidth).toBe(undefined)

    const wrapStyle = webFlexStyle({ wrap: 'wrap' }) as Record<string, unknown>
    expect(wrapStyle.maxWidth).toBe('100%')

    const itemStyle = webFlexItemStyle() as Record<string, unknown>
    expect(itemStyle.flex).toBe(1)
    expect(itemStyle.width).toBe('100%')
  })
})
