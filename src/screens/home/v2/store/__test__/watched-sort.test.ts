/*
 * @Author: czy0729
 * @Date: 2026-08-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 18:47:53
 */
import { resolveWatchedSort } from '../utils'

import type { Ep } from '@stores/subject/types'

/** 构造最小章节 */
function makeEp(sort: number): Ep {
  return {
    id: sort,
    sort,
    type: 0,
    status: 'Air',
    name: '',
    name_cn: '',
    airdate: ''
  } as unknown as Ep
}

function makeEps(sorts: number[]) {
  return sorts.map(makeEp)
}

// ==================== 普通番 (首集 < 10) ====================
describe('resolveWatchedSort: 普通番', () => {
  it('原始章节从 1 开始, 直接使用当前 sort', () => {
    const displayEps = makeEps([1, 2, 3])
    const allEps = makeEps([1, 2, 3])
    expect(resolveWatchedSort(displayEps, allEps, 2)).toBe(2)
  })

  it('零基番剧 (从第 0 集开始), 需要 +1', () => {
    const displayEps = makeEps([0, 1, 2])
    const allEps = makeEps([0, 1, 2])
    expect(resolveWatchedSort(displayEps, allEps, 5)).toBe(6)
  })

  it('看到第 0 集, 提交 1', () => {
    const displayEps = makeEps([0, 1, 2])
    const allEps = makeEps([0, 1, 2])
    expect(resolveWatchedSort(displayEps, allEps, 0)).toBe(1)
  })
})

// ==================== 多季番 (原始首集 > 10) ====================
describe('resolveWatchedSort: 多季番', () => {
  it('使用当前 sort 在原始章节中的 index, 再 +1', () => {
    const displayEps = makeEps([13, 14, 15])
    const allEps = makeEps([13, 14, 15, 16])
    // 点击 14, 在原始章节中 index 为 1, 原始首集非 1, 提交 2
    expect(resolveWatchedSort(displayEps, allEps, 14)).toBe(2)
  })

  it('原始章节中找不到时回退当前 sort', () => {
    const displayEps = makeEps([13, 14, 15])
    const allEps = makeEps([13, 15, 16])
    expect(resolveWatchedSort(displayEps, allEps, 14)).toBe(14)
  })
})

// ==================== 正常多章节番 (分页窗口首集 >= 10) ====================
describe('resolveWatchedSort: 分页窗口', () => {
  it('显示窗口首集 >= 10 但原始从 1 开始, 使用原始 sort', () => {
    const displayEps = makeEps([40, 41, 42])
    const allEps = makeEps(Array.from({ length: 100 }, (_, i) => i + 1))
    expect(resolveWatchedSort(displayEps, allEps, 42)).toBe(42)
  })

  it('[回归] 原始章节中找不到时回退当前 sort, 不能产生 NaN', () => {
    const displayEps = makeEps([40, 41, 42])
    const allEps = makeEps(Array.from({ length: 100 }, (_, i) => i + 1))
    expect(resolveWatchedSort(displayEps, allEps, 999)).toBe(999)
  })
})

// ==================== 边界 ====================
describe('resolveWatchedSort: 边界', () => {
  it('空章节数据回退当前 sort', () => {
    expect(resolveWatchedSort([], [], 3)).toBe(3)
  })
})
