/*
 * @Author: czy0729
 * @Date: 2026-09-28 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-20 12:00:00
 *
 * 关联图页面状态工具单测
 */
import { normalizeHideTypes, normalizeRelateMap, sortByDate } from '../utils'

import type { NodeItem, RelateMap } from '../../types'

/** 构造节点 */
function node(id: string | number, date: string = '', name: string = ''): NodeItem {
  return {
    id,
    date,
    name,
    nameCN: '',
    nsfw: false,
    platform: '',
    type: 2
  }
}

/** 构造关系图数据 */
function map(data: Partial<RelateMap> = {}): RelateMap {
  return {
    id: 0,
    node: [],
    relate: [],
    ...data
  }
}

describe('normalizeHideTypes', () => {
  it('旧缓存的字符串转换为数字', () => {
    expect(normalizeHideTypes(['2', '6'])).toEqual([2, 6])
  })

  it('数字原样保留', () => {
    expect(normalizeHideTypes([2, 6])).toEqual([2, 6])
  })

  it('过滤无法转换的值并去重', () => {
    expect(normalizeHideTypes(['2', 2, 'x', undefined, {}])).toEqual([2])
  })

  it('非数组返回空数组', () => {
    expect(normalizeHideTypes(undefined)).toEqual([])
    expect(normalizeHideTypes('2')).toEqual([])
  })
})

describe('normalizeRelateMap', () => {
  it('节点与关联线的 id 统一为数字', () => {
    const result = normalizeRelateMap(
      map({
        id: '10',
        node: [node('1'), node(2)],
        relate: [{ src: '1', dst: 2, relate: '续作' }]
      })
    )

    expect(result.id).toBe(10)
    expect(result.node.map(item => item.id)).toEqual([1, 2])
    expect(result.relate[0]).toEqual({ src: 1, dst: 2, relate: '续作' })
  })

  it('非法 id 与空白 id 的节点被丢弃', () => {
    const result = normalizeRelateMap(
      map({ node: [node('abc'), node(''), node(' '), node('\n'), node('1')] })
    )
    expect(result.node.map(item => item.id)).toEqual([1])
  })

  it('数字与字符串分支对边界值处理一致', () => {
    const accepted = normalizeRelateMap(map({ node: [node(12), node('12')] }))
    expect(accepted.node.map(item => item.id)).toEqual([12, 12])

    const rejected = normalizeRelateMap(
      map({ node: [node(0), node('0'), node(-1), node('-1'), node(1.5), node('1.5')] })
    )
    expect(rejected.node).toEqual([])
  })

  it('端点为非法 id 的关联线被丢弃', () => {
    const result = normalizeRelateMap(
      map({
        relate: [
          { src: '1', dst: 'abc', relate: '续作' },
          { src: '1', dst: '2', relate: '前传' }
        ]
      })
    )

    expect(result.relate).toEqual([{ src: 1, dst: 2, relate: '前传' }])
  })

  it('缺失的 node / relate 补为空数组', () => {
    const result = normalizeRelateMap({ id: 1 } as RelateMap)
    expect(result.node).toEqual([])
    expect(result.relate).toEqual([])
  })
})

describe('sortByDate', () => {
  it('按日期升序, 无日期排最后', () => {
    const result = sortByDate([node(1), node(2, '2020-01-01'), node(3, '2019-01-01')])
    expect(result.map(item => item.id)).toEqual([3, 2, 1])
  })

  it('同日期时名称不含括号的优先', () => {
    const result = sortByDate([node(1, '2020-01-01', 'B (续)'), node(2, '2020-01-01', 'A')])
    expect(result.map(item => item.id)).toEqual([2, 1])
  })

  it('不修改原数组', () => {
    const list = [node(1, '2020-01-01'), node(2, '2019-01-01')]
    sortByDate(list)
    expect(list.map(item => item.id)).toEqual([1, 2])
  })
})
