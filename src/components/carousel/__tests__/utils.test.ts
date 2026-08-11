/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React from 'react'
import { Text } from 'react-native'
import {
  clampIndex,
  getChildrenCount,
  getInitialIndex,
  getNextOffset,
  getUpdatedIndex
} from '../utils'

describe('getChildrenCount', () => {
  it('空返回 0', () => {
    expect(getChildrenCount()).toBe(0)
  })

  it('null 返回 0', () => {
    expect(getChildrenCount(null)).toBe(0)
  })

  it('单元素返回 1', () => {
    expect(getChildrenCount(React.createElement(Text))).toBe(1)
  })

  it('数组返回长度', () => {
    expect(
      getChildrenCount([React.createElement(Text), React.createElement(Text)])
    ).toBe(2)
  })
})

describe('clampIndex', () => {
  it('负数归 0', () => {
    expect(clampIndex(-3, 5)).toBe(0)
  })

  it('超过上限截断', () => {
    expect(clampIndex(9, 5)).toBe(4)
  })

  it('正常范围内原样返回', () => {
    expect(clampIndex(2, 5)).toBe(2)
  })

  it('count 为 1 时归 0', () => {
    expect(clampIndex(2, 1)).toBe(0)
  })
})

describe('getInitialIndex', () => {
  it('count > 1 时返回选中页', () => {
    expect(getInitialIndex(5, 3)).toBe(3)
  })

  it('selectedIndex 超界截断', () => {
    expect(getInitialIndex(3, 10)).toBe(2)
  })

  it('count <= 1 时回 0', () => {
    expect(getInitialIndex(1, 0)).toBe(0)
  })
})

describe('getUpdatedIndex', () => {
  const step = 100
  const count = 4

  it('无偏移时索引不变', () => {
    const r = getUpdatedIndex(0, 0, step, count, false)
    expect(r.index).toBe(0)
    expect(r.loopJump).toBe(false)
  })

  it('向前一页', () => {
    expect(getUpdatedIndex(0, step, step, count, false).index).toBe(1)
  })

  it('向后一页', () => {
    expect(getUpdatedIndex(1, -step, step, count, false).index).toBe(0)
  })

  it('非 infinite 在首尾被截断', () => {
    expect(getUpdatedIndex(0, -step, step, count, false).index).toBe(0)
    expect(getUpdatedIndex(count - 1, step, step, count, false).index).toBe(3)
  })

  it('infinite 翻过头回第 0 页并标记 loopJump', () => {
    const r = getUpdatedIndex(count - 1, step, step, count, true)
    expect(r).toEqual({ index: 0, loopJump: true, offsetTo: step })
  })

  it('infinite 回退过头回末页并标记 loopJump', () => {
    const r = getUpdatedIndex(0, -step, step, count, true)
    expect(r).toEqual({ index: count - 1, loopJump: true, offsetTo: step * count })
  })
})

describe('getNextOffset', () => {
  const step = 100
  const count = 4

  it('非 infinite 从第 0 页到第 1 页', () => {
    expect(getNextOffset(0, count, false, step)).toBe(100)
  })

  it('infinite 模式整体右移一页', () => {
    expect(getNextOffset(0, count, true, step)).toBe(200)
  })
})