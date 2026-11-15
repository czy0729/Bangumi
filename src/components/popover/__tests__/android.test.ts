/*
 * @Author: czy0729
 * @Date: 2026-11-14 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-14 00:00:00
 *
 * Android 自定义原生菜单的 JS 侧契约
 *  - 直接测命令式入口, 不依赖 react-test-renderer (hook 的激活方式在 hooks.test.ts 覆盖)
 */
import { NativeModules, UIManager } from 'react-native'
import { globalWarn } from '@utils/dev'
import { parseArgb, showAndroidPopMenu } from '../android'

jest.mock('@utils/thirdParty/open-cc', () => ({
  s2t: (text: string) => `T:${text}`
}))

// 只用到语义色反查, 与真实实现同规则 (返回样式数组, 倒序取 color)
jest.mock('@components/text', () => ({
  getTextStyle: ({ type }: { type: string }) => [
    { color: type === 'danger' ? 'rgb(255, 59, 48)' : 'rgb(0, 0, 0)' }
  ]
}))

const anchor = {} as any

const state = () => (global as any).__mockStoreState__
const evt = { pageX: 1, pageY: 2 }

let showMenu: jest.Mock

beforeEach(() => {
  state().s2t = false
  showMenu = jest.fn()
  ;(NativeModules as any).PopMenuModule = { show: showMenu }
  ;(UIManager as any).showPopupMenu = jest.fn()
  ;(globalWarn as jest.Mock).mockClear()
})

afterEach(() => {
  delete (NativeModules as any).PopMenuModule
  delete (UIManager as any).showPopupMenu
})

const itemsOf = (): any[] => showMenu.mock.calls[0][2]

/** 带符号 32 位 ARGB, 也是 Java long→int 的结果 */
const argb = (value: number) => value | 0

describe('showAndroidPopMenu', () => {
  it('把锚点 reactTag 与结构化菜单项交给原生模块', () => {
    showAndroidPopMenu({ anchor, data: ['买入', '卖出'], evt })

    expect(showMenu).toHaveBeenCalledTimes(1)
    // findNodeHandle 在测试 mock 中固定返回 1; dark 跟随 _ mock 默认浅色
    expect(showMenu.mock.calls[0].slice(0, 2)).toEqual([1, false])
    expect(itemsOf().map(item => item.text)).toEqual(['买入', '卖出'])
  })

  it('没有锚点时静默返回', () => {
    showAndroidPopMenu({ anchor: null, data: ['买入'] })

    expect(showMenu).not.toHaveBeenCalled()
  })

  it('value 命中项渲染勾, 标题项置灰且不占数据下标', () => {
    showAndroidPopMenu({
      anchor,
      data: ['买入', '卖出'],
      value: '卖出',
      title: '排序'
    })

    const items = itemsOf()
    expect(items[0]).toMatchObject({ text: '排序', isTitle: true, checked: false, index: -1 })
    expect(items[1]).toMatchObject({ text: '买入', checked: false, index: 0 })
    expect(items[2]).toMatchObject({ text: '卖出', checked: true, index: 1 })
    expect(items[0].color).toBeUndefined()
  })

  it('文字色优先级: 显式 color > type 语义色 > 跟随主题 (缺省)', () => {
    showAndroidPopMenu({
      anchor,
      data: ['买入', { text: '删除', type: 'danger' }, { text: '置灰', color: 'rgb(1, 2, 3)' }]
    })

    const items = itemsOf()
    expect(items[0].color).toBeUndefined()
    expect(items[1].color).toBe(argb(0xffff3b30))
    expect(items[2].color).toBe(argb(0xff010203))
  })

  it('非法颜色回退跟随主题而不是黑色', () => {
    showAndroidPopMenu({
      anchor,
      data: [{ text: '置灰', color: 'hsl(0, 0%, 0%)' }, { text: '未知', color: 'not-a-color' }]
    })

    expect(itemsOf()[0].color).toBeUndefined()
    expect(itemsOf()[1].color).toBeUndefined()
  })

  it('显式 transparent 如实传 0, 由原生渲染透明文字', () => {
    showAndroidPopMenu({ anchor, data: [{ text: '透明', color: 'transparent' }] })

    expect(itemsOf()[0].color).toBe(0)
  })

  it('展示文案做简繁转换, 选中回调回传原始数据与索引', () => {
    state().s2t = true
    const onSelect = jest.fn()
    showAndroidPopMenu({ anchor, data: ['买入', '卖出'], onSelect, evt })

    expect(itemsOf().map(item => item.text)).toEqual(['T:买入', 'T:卖出'])

    showMenu.mock.calls[0][3](1)
    expect(onSelect).toHaveBeenCalledWith('卖出', 1, evt)
  })

  it('原生回调越界或取消 (-1) 时不触发 onSelect', () => {
    const onSelect = jest.fn()
    showAndroidPopMenu({ anchor, data: ['买入'], onSelect })

    showMenu.mock.calls[0][3](-1)
    showMenu.mock.calls[0][3](9)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('标题项不占索引: 选中第一项仍回传 data[0]', () => {
    const onSelect = jest.fn()
    showAndroidPopMenu({ anchor, data: ['买入', '卖出'], title: '排序', onSelect })

    expect(itemsOf()).toHaveLength(3)
    showMenu.mock.calls[0][3](0)
    expect(onSelect).toHaveBeenCalledWith('买入', 0, undefined)
  })

  it('原生模块缺失时降级到系统菜单 (纯文本), 索引归一为数字', () => {
    delete (NativeModules as any).PopMenuModule
    const showPopupMenu = (UIManager as any).showPopupMenu
    const onSelect = jest.fn()

    showAndroidPopMenu({ anchor, data: ['买入', '卖出'], onSelect, evt })

    expect(showPopupMenu).toHaveBeenCalledTimes(1)
    expect(showPopupMenu.mock.calls[0][1]).toEqual(['买入', '卖出'])
    showPopupMenu.mock.calls[0][3]('卖出', '1')
    expect(onSelect).toHaveBeenCalledWith('卖出', 1, evt)
  })

  it('降级路径: 标题拼为首行, 选中下标映射回原始数据', () => {
    delete (NativeModules as any).PopMenuModule
    const showPopupMenu = (UIManager as any).showPopupMenu
    const onSelect = jest.fn()

    showAndroidPopMenu({ anchor, data: ['买入', '卖出'], title: '排序', onSelect, evt })

    expect(showPopupMenu.mock.calls[0][1]).toEqual(['排序', '买入', '卖出'])
    // 回调签名 (event, index): 下标 2 → 原始数据下标 1
    showPopupMenu.mock.calls[0][3](evt, '2')
    expect(onSelect).toHaveBeenCalledWith('卖出', 1, evt)
    // 标题行 (下标 0) 不触发回调
    showPopupMenu.mock.calls[0][3](evt, '0')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('两种菜单能力都缺失时告警且不抛错', () => {
    delete (NativeModules as any).PopMenuModule
    delete (UIManager as any).showPopupMenu

    expect(() => showAndroidPopMenu({ anchor, data: ['买入'] })).not.toThrow()
    expect(globalWarn).toHaveBeenCalledTimes(1)
  })
})

describe('parseArgb', () => {
  it('hex 与缩写 hex', () => {
    expect(parseArgb('#ff0000')).toBe(argb(0xffff0000))
    expect(parseArgb('#f00')).toBe(argb(0xffff0000))
    expect(parseArgb('#00000080')).toBe(argb(0x80000000))
    expect(parseArgb('#f008')).toBe(argb(0x88ff0000))
  })

  it('rgb / rgba 与命名色', () => {
    expect(parseArgb('rgb(255, 59, 48)')).toBe(argb(0xffff3b30))
    expect(parseArgb('rgba(0, 0, 0, 0.1)')).toBe(argb(0x1a000000))
    expect(parseArgb('gray')).toBe(argb(0xff808080))
    expect(parseArgb('transparent')).toBe(0)
  })

  it('已是整数时原样返回, 非法值返回 undefined (跟随主题)', () => {
    expect(parseArgb(argb(0xff123456))).toBe(argb(0xff123456))
    expect(parseArgb(undefined)).toBeUndefined()
    expect(parseArgb('not-a-color')).toBeUndefined()
  })

  it('rgb() 百分比写法整串拒绝, 返回 undefined (跟随主题)', () => {
    expect(parseArgb('rgb(100%, 0%, 0%)')).toBeUndefined()
    expect(parseArgb('rgba(0, 0, 0, 50%)')).toBeUndefined()
  })
})

describe('parseArgb 桥接契约', () => {
  /**
   * 模拟 Java 的 (int)(long) map.getDouble(key): JS 的 |0 等价于 long→int 按位截断。
   * 若 JS 侧改回 >>>0 返回无符号值, Java 的 (int) double 会按 JLS 5.1.3 饱和到
   * Integer.MAX_VALUE, 导致不透明色全变半透明白, 下面这些用例会直接失败。
   */
  const javaRead = (value: number) => value | 0

  it('所有色值都是带符号 int32, 桥上不会被饱和钳住', () => {
    const colors = [
      '#ffffff',
      '#000000',
      'gray',
      'rgba(0, 0, 0, 0.1)',
      'rgb(255, 59, 48)',
      'transparent',
      '#ffffffff'
    ]

    for (const color of colors) {
      const value = parseArgb(color)
      expect(value).toBe(javaRead(value))
      expect(value).toBeGreaterThanOrEqual(-2147483648)
      expect(value).toBeLessThanOrEqual(2147483647)
    }
  })

  it('回归: 不透明的 gray / white 不能退化成 Integer.MAX_VALUE', () => {
    expect(parseArgb('gray')).toBe(argb(0xff808080))
    expect(parseArgb('gray')).toBe(-8355712)
    expect(parseArgb('gray')).not.toBe(2147483647)
    expect(parseArgb('#ffffffff')).toBe(-1)
  })

  it('传给原生的菜单项色值均为带符号 int32', () => {
    showAndroidPopMenu({
      anchor,
      data: ['买入', { text: '删除', type: 'danger' }, { text: '置灰', color: '#ffffff' }],
      value: '买入',
      title: '排序'
    })

    const colors = itemsOf()
      .map(i => i.color)
      .filter(c => typeof c === 'number')
    expect(colors.length).toBeGreaterThan(0)
    for (const value of colors) {
      expect(value).toBe(javaRead(value))
      expect(javaRead(value)).not.toBe(2147483647)
    }
  })
})
