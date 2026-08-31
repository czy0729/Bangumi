/*
 * @Author: czy0729
 * @Date: 2026-08-31 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 16:00:00
 *
 * 评分月刊分块摊平纯函数的逻辑测试
 */
import { getFlatList } from '../utils'

import type { FlatItem } from '../types'

/** 按类型收窄列表项 */
function filterType<T extends FlatItem['type']>(list: FlatItem[], type: T) {
  return list.filter((item): item is Extract<FlatItem, { type: T }> => item.type === type)
}

/** 构造分块数据 */
function buildBlocks() {
  return [
    {
      title: '新增',
      data: [
        { id: '1', title: 'A', value1: '9' },
        { id: '2', title: 'B', value1: '10' },
        { id: '3', title: 'C', value1: '8' }
      ]
    },
    {
      title: '趋势一',
      data: [
        { id: '1', title: 'A' },
        { id: '4', title: 'D' }
      ]
    },
    {
      title: '趋势二',
      data: [{ id: '5', title: 'E' }]
    }
  ]
}

describe('getFlatList', () => {
  it('空分块返回空数组', () => {
    expect(getFlatList([])).toEqual([])
  })

  it('每块先插入一条 header 项, key 以块号区分', () => {
    const list = getFlatList(buildBlocks())
    const headers = filterType(list, 'header')

    expect(headers).toHaveLength(3)
    expect(headers.map(item => item.title)).toEqual(['新增', '趋势一', '趋势二'])
    expect(headers.map(item => item.key)).toEqual(['header-0', 'header-1', 'header-2'])
  })

  it('第 0 块按 value1 数值升序排列', () => {
    // 字符串直接比较会得到 '10' < '8' < '9', 必须转数值
    const list = getFlatList(buildBlocks())
    const firstBlock = filterType(list, 'new')

    expect(firstBlock.map(item => item.item.id)).toEqual(['3', '1', '2'])
  })

  it('非第 0 块保持原始顺序', () => {
    const list = getFlatList(buildBlocks())
    const secondBlock = filterType(list, 'trend').filter(item => item.key.startsWith('1-'))

    expect(secondBlock.map(item => item.item.id)).toEqual(['1', '4'])
  })

  it('条目 key 以块号为前缀, 跨块 id 重复也不冲突', () => {
    const list = getFlatList(buildBlocks())
    const keys = list.map(item => item.key)

    expect(new Set(keys).size).toBe(keys.length)
    expect(filterType(list, 'new').map(item => item.key)).toEqual(['0-3', '0-1', '0-2'])
  })

  it('index 为块内序号, 从 0 开始', () => {
    const list = getFlatList(buildBlocks())
    const firstBlock = filterType(list, 'new')

    expect(firstBlock.map(item => item.index)).toEqual([0, 1, 2])
  })

  it('不修改原数组 (拷贝排序)', () => {
    const blocks = buildBlocks()

    getFlatList(blocks)

    expect(blocks[0].data.map(item => item.id)).toEqual(['1', '2', '3'])
  })
})
