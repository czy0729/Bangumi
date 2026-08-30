/*
 * @Author: czy0729
 * @Date: 2026-08-30 21:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:54
 *
 * converters 纯函数测试：Pair/Group 数组还原为 Record
 */
import { convert, groupsToRecord, pairsToRecord } from '../converters'

describe('pairsToRecord', () => {
  it('Pair 数组还原为 Record', () => {
    expect(
      pairsToRecord([
        { k: 'CLANNAD', v: 2273 },
        { k: 'AIR', v: 828 }
      ])
    ).toEqual({ AIR: 828, CLANNAD: 2273 })
  })

  it('proto3 默认值缺失 (v undefined) 的条目跳过', () => {
    expect(
      pairsToRecord([
        { k: 'a', v: 1 },
        { k: 'b', v: undefined as unknown as number }
      ])
    ).toEqual({ a: 1 })
  })
})

describe('groupsToRecord', () => {
  it('Group 数组还原为 Record', () => {
    expect(
      groupsToRecord([
        { k: '1979', v: [37460, 314] },
        { k: '1980', v: [] }
      ])
    ).toEqual({ 1979: [37460, 314], 1980: [] })
  })

  it('缺失 v 的条目跳过', () => {
    expect(
      groupsToRecord([
        { k: 'a', v: [1] },
        { k: 'b', v: undefined as unknown as number[] }
      ])
    ).toEqual({ a: [1] })
  })
})

describe('convert', () => {
  it('ja / d 按 Pair 数组还原', () => {
    expect(convert('ja', [{ k: '86', v: 302189 }])).toEqual({ 86: 302189 })
    expect(convert('d', [{ k: '1007914', v: 425290 }])).toEqual({ 1007914: 425290 })
  })

  it('katakana 按 Pair 数组还原', () => {
    expect(
      convert('katakana', [{ k: 'オリジナルサウンドトラック', v: 'Original Soundtrack' }])
    ).toEqual({ オリジナルサウンドトラック: 'Original Soundtrack' })
  })

  it('anime-ids 按 Group 数组还原', () => {
    expect(convert('anime-ids', [{ k: '1979', v: [37460] }])).toEqual({ 1979: [37460] })
  })

  it('对象数组类数据集恒等返回', () => {
    const items = [{ i: 1, n: '京都动画' }]
    expect(convert('mono', items)).toBe(items)
  })
})
