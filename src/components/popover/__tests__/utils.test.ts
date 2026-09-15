/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 05:52:47
 */
import { toMenuLabel, toMenuLabels } from '../utils'

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
