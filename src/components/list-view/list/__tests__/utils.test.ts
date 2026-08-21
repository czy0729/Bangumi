/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 11:30:00
 */
import { buildOffsets, getItemLayout } from '../utils'

describe('buildOffsets', () => {
  it('生成前缀和偏移数组', () => {
    expect(buildOffsets([100, 200, 150], 120, 3)).toEqual([0, 100, 300])
  })

  it('未测量项回退到预估高度', () => {
    expect(buildOffsets([100, undefined as unknown as number], 120, 2)).toEqual([0, 100])
    expect(buildOffsets([], 120, 2)).toEqual([0, 120])
  })
})

describe('getItemLayout', () => {
  const heights = [100, 200, 150, 80]

  it('返回给定索引的长度', () => {
    expect(getItemLayout(heights, 120, 0)).toMatchObject({ length: 100, index: 0 })
    expect(getItemLayout(heights, 120, 2)).toMatchObject({ length: 150, index: 2 })
  })

  it('偏移为之前所有条目高度之和', () => {
    expect(getItemLayout(heights, 120, 0).offset).toBe(0)
    expect(getItemLayout(heights, 120, 1).offset).toBe(100)
    expect(getItemLayout(heights, 120, 3).offset).toBe(100 + 200 + 150)
  })

  it('未测量项回退到预估高度', () => {
    const result = getItemLayout(heights, 120, 99)
    expect(result.length).toBe(120)
    expect(result.index).toBe(99)
  })

  it('空高度数组全程使用预估高度', () => {
    const result = getItemLayout([], 120, 2)
    expect(result.length).toBe(120)
    expect(result.offset).toBe(240)
  })

  it('baseOffset 补偿条目之前的 header 高度', () => {
    expect(getItemLayout(heights, 120, 0, 300).offset).toBe(300)
    expect(getItemLayout(heights, 120, 2, 300).offset).toBe(300 + 100 + 200)
  })

  it('传入预计算 offsets 结果一致', () => {
    const offsets = buildOffsets(heights, 120, heights.length)
    expect(getItemLayout(heights, 120, 1, 0, offsets)).toMatchObject({
      length: 200,
      offset: 100,
      index: 1
    })
    expect(getItemLayout(heights, 120, 3, 300, offsets).offset).toBe(300 + 450)
  })
})
