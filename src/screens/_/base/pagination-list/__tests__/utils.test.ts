/*
 * @Author: czy0729
 * @Date: 2026-08-31 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 12:00:00
 *
 * 本地分页纯函数的逻辑测试
 */
import { calcPageTotal, clampPage, getPageData, getVisibleList } from '../utils'

describe('calcPageTotal', () => {
  it('空数据返回 0', () => {
    expect(calcPageTotal(0, 24)).toBe(0)
  })

  it('整除时不多算一页', () => {
    // [回归] 旧实现 Math.floor(length / limit) + 1 在整除时会多算一页 (48 条 24 页距算出 3 页)
    expect(calcPageTotal(48, 24)).toBe(2)
    expect(calcPageTotal(24, 24)).toBe(1)
  })

  it('非整除向上取整', () => {
    expect(calcPageTotal(49, 24)).toBe(3)
    expect(calcPageTotal(1, 24)).toBe(1)
    expect(calcPageTotal(25, 24)).toBe(2)
  })

  it('limit 为 0 时返回 0 而不是 Infinity', () => {
    expect(calcPageTotal(48, 0)).toBe(0)
  })
})

describe('clampPage', () => {
  it('未超出总页数时原样返回', () => {
    expect(clampPage(1, 3)).toBe(1)
    expect(clampPage(3, 3)).toBe(3)
  })

  it('超出总页数时钳制到最后一页 (数据缩短场景)', () => {
    expect(clampPage(5, 3)).toBe(3)
  })

  it('空数据 (总页数 0) 时页码归 0', () => {
    expect(clampPage(1, 0)).toBe(0)
  })
})

describe('getVisibleList', () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8]

  it('第 1 页返回前 limit 条', () => {
    expect(getVisibleList(data, 1, 3)).toEqual([1, 2, 3])
  })

  it('多页时返回第 1 页到当前页的累积切片', () => {
    expect(getVisibleList(data, 2, 3)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('page 为 0 (空数据) 返回空数组', () => {
    expect(getVisibleList(data, 0, 3)).toEqual([])
  })

  it('超出数据总量时返回全量', () => {
    expect(getVisibleList(data, 5, 3)).toEqual(data)
  })

  it('page 为负数时返回空数组, 不命中 slice 负索引陷阱', () => {
    // slice(0, 负数) 会从末尾裁剪, 返回部分数据是错误行为
    expect(getVisibleList(data, -1, 3)).toEqual([])
  })

  it('不修改原数组', () => {
    getVisibleList(data, 2, 3)
    expect(data).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  it('支持只读数组', () => {
    const readonlyData: readonly number[] = [1, 2, 3]
    expect(getVisibleList(readonlyData, 1, 2)).toEqual([1, 2])
  })
})

describe('getPageData', () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8]

  it('返回第 1 页数据', () => {
    expect(getPageData(data, 1, 3)).toEqual([1, 2, 3])
  })

  it('返回中间页数据', () => {
    expect(getPageData(data, 2, 3)).toEqual([4, 5, 6])
  })

  it('末页不足 limit 时返回剩余部分', () => {
    expect(getPageData(data, 3, 3)).toEqual([7, 8])
  })

  it('页码超出范围返回空数组', () => {
    expect(getPageData(data, 4, 3)).toEqual([])
  })

  it('页码小于 1 返回空数组, 不命中 slice 负索引陷阱', () => {
    // slice(负数) 会从末尾开始计数, 命中末尾数据是错误行为
    expect(getPageData(data, 0, 3)).toEqual([])
  })

  it('空数据返回空数组', () => {
    expect(getPageData([], 1, 3)).toEqual([])
  })
})

describe('分页契约', () => {
  const data = Array.from({ length: 50 }, (_, index) => index + 1)
  const limit = 24

  it('footer 翻页后: 托管列表累积到新页, onPage 拿到新页, onNextPage 拿到下下一页', () => {
    // 从第 1 页翻到第 2 页
    expect(getVisibleList(data, 2, limit)).toHaveLength(48)
    expect(getPageData(data, 2, limit)).toEqual([
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48
    ])
    expect(getPageData(data, 3, limit)).toEqual([49, 50])
  })

  it('数据整除 limit 时页数不多算', () => {
    // [回归] 旧实现 48 条 / 每页 24 会算出 3 页, 用户多经历一次空跑的加载更多
    const data48 = data.slice(0, 48)
    expect(calcPageTotal(data48.length, limit)).toBe(2)
    expect(getPageData(data48, 2, limit)).toHaveLength(24)
    expect(getPageData(data48, 3, limit)).toEqual([])
  })

  it('数据更新后按已翻页数重新划归, 数据缩短时钳制页码', () => {
    // 用户已翻到第 3 页, 数据缩短到 30 条
    const pageTotal = calcPageTotal(30, limit)
    expect(pageTotal).toBe(2)
    expect(clampPage(3, pageTotal)).toBe(2)
    expect(getVisibleList(data.slice(0, 30), clampPage(3, pageTotal), limit)).toHaveLength(30)
  })
})
