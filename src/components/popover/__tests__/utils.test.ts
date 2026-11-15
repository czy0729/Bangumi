/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 05:52:47
 */
import { toMenuEntries, toMenuLabel, toMenuLabels } from '../utils'

// 该子路径不被全局 @utils mock 覆盖, 局部 mock 保证转换结果可断言
jest.mock('@utils/thirdParty/open-cc', () => ({
  s2t: (text: string) => `T:${text}`
}))

// 简繁转换开关由 jest.setup.js 的 @stores mock 可变 cell 控制
const state = () => (global as any).__mockStoreState__

describe('toMenuLabels', () => {
  afterEach(() => {
    state().s2t = false
  })

  it('空数据返回空数组', () => {
    expect(toMenuLabels()).toEqual([])
    expect(toMenuLabels([])).toEqual([])
  })

  it('未开启简繁转换时原样返回', () => {
    expect(toMenuLabels(['买入', '卖出'])).toEqual(['买入', '卖出'])
  })

  it('开启简繁转换后返回转换后的展示文案', () => {
    state().s2t = true
    expect(toMenuLabels(['买入', '卖出'])).toEqual(['T:买入', 'T:卖出'])
  })

  it('返回新数组, 改动结果不影响入参', () => {
    const data = ['买入', '卖出']
    const result = toMenuLabels(data)

    expect(result).not.toBe(data)
    result.push('资产重组')
    expect(data).toEqual(['买入', '卖出'])
  })
})

describe('toMenuEntries', () => {
  afterEach(() => {
    state().s2t = false
  })

  it('字符串与对象项统一归一, raw 与 index 保留原始数据', () => {
    const data = ['买入', { text: '卖出' }]
    const entries = toMenuEntries(data)

    expect(entries.map(item => [item.text, item.index])).toEqual([
      ['买入', 0],
      ['卖出', 1]
    ])
    expect(entries[0].raw).toBe('买入')
    expect(entries[1].raw).toBe(data[1])
  })

  it('value 按原始文案推导勾选, 显式 checked 优先', () => {
    const entries = toMenuEntries(
      ['买入', { text: '卖出' }, { text: '撤单', checked: true }],
      '卖出'
    )

    expect(entries.map(item => item.checked)).toEqual([false, true, true])
  })

  it('对象项的图标 / 语义色 / 显式颜色原样保留', () => {
    const [entry] = toMenuEntries([
      { text: '删除', icon: 'md-delete-outline', type: 'danger', color: 'rgb(1, 2, 3)' }
    ])

    expect(entry).toMatchObject({
      icon: 'md-delete-outline',
      type: 'danger',
      color: 'rgb(1, 2, 3)'
    })
  })

  it('标题项置顶且不占数据下标', () => {
    const entries = toMenuEntries(['买入', '卖出'], '卖出', '排序')

    expect(entries).toHaveLength(3)
    expect(entries[0]).toMatchObject({ text: '排序', isTitle: true, index: -1 })
    expect(entries[1].index).toBe(0)
    expect(entries[2].index).toBe(1)
  })

  it('简繁转换只作用于展示文案, raw 保持未转换', () => {
    state().s2t = true
    const entries = toMenuEntries(['买入'], undefined, '排序')

    expect(entries[0].text).toBe('T:排序')
    expect(entries[1].text).toBe('T:买入')
    expect(entries[1].raw).toBe('买入')
  })

  it('空数据且无标题时返回空数组', () => {
    expect(toMenuEntries()).toEqual([])
  })
})

describe('toMenuLabel', () => {
  afterEach(() => {
    state().s2t = false
  })

  it('非字符串原样返回', () => {
    expect(toMenuLabel(undefined)).toBeUndefined()
    expect(toMenuLabel(null)).toBeNull()
    expect(toMenuLabel(0)).toBe(0)
  })

  it('空字符串原样返回', () => {
    expect(toMenuLabel('')).toBe('')
  })

  it('未开启简繁转换时原样返回', () => {
    expect(toMenuLabel('买入')).toBe('买入')
  })

  it('开启简繁转换后返回转换后的展示文案', () => {
    state().s2t = true
    expect(toMenuLabel('买入')).toBe('T:买入')
  })
})
