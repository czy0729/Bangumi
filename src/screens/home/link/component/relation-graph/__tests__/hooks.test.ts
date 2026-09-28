/*
 * @Author: czy0729
 * @Date: 2026-09-27 11:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 19:20:04
 *
 * 关系图逻辑单测 (数据见 ./fixture)
 */
jest.mock('../ds', () => ({
  COMPONENT: 'RelationGraph',
  SCREEN_HEIGHT: 800,
  SCREEN_WIDTH: 375,
  NODES_FOR_SPLIT: 40,
  HEAD_KEEP_COUNT: 4,
  TAIL_KEEP_COUNT: 4,
  FOCUS_WINDOW_RADIUS: 10,
  EXPAND_STEP: 40,
  START_FROM_RIGHT: true
}))

import { NODES, RELATES, SORTED_IDS } from './fixtures/fixture'
import {
  createWindow,
  expandWindow,
  getFocusRelations,
  getScrollOffsetToNode,
  groupNodesByYear,
  sliceWindow,
  sortNodesByDate,
  splitNodes,
  splitRelationsBySide
} from '../hooks'

describe('sortNodesByDate', () => {
  it('按日期升序排序', () => {
    expect(sortNodesByDate(NODES).map(item => item.id)).toEqual(SORTED_IDS)
  })

  it('不修改入参', () => {
    const list = [...NODES]
    sortNodesByDate(list)
    expect(list.map(item => item.id)).toEqual(NODES.map(item => item.id))
  })

  it('无日期的节点排最后', () => {
    const noDate = { ...NODES[0], id: 999999, date: '' }
    const result = sortNodesByDate([NODES[5], noDate, NODES[0]])
    expect(result.map(item => item.id)).toEqual([277554, 501963, 999999])
  })
})

describe('splitNodes', () => {
  it('总量未超过阈值时全部为中间分段, 头尾为空', () => {
    const sorted = sortNodesByDate(NODES)
    const { headNodes, tailNodes, middleNodes } = splitNodes(sorted)

    expect(headNodes).toEqual([])
    expect(tailNodes).toEqual([])
    expect(middleNodes.map(item => item.id)).toEqual(SORTED_IDS)
  })

  it('超过阈值时头尾固定, 其余为中间分段', () => {
    // 构造 60 个节点 (阈值 40, 头尾各保留 4), 日期唯一保证排序确定
    const list = NODES.concat(
      Array.from({ length: 54 }, (_, i) => ({
        ...NODES[i % NODES.length],
        id: 700000 + i,
        date: `2010-${String(Math.floor(i / 28) + 1).padStart(2, '0')}-${String(
          (i % 28) + 1
        ).padStart(2, '0')}`
      }))
    )
    const sorted = sortNodesByDate(list)
    const { headNodes, tailNodes, middleNodes } = splitNodes(sorted)

    expect(headNodes).toHaveLength(4)
    expect(tailNodes).toHaveLength(4)
    expect(middleNodes).toHaveLength(52)
    // 头部是最早的 4 个 (2010-01-01..04)
    expect(headNodes.map(item => item.date)).toEqual([
      '2010-01-01',
      '2010-01-02',
      '2010-01-03',
      '2010-01-04'
    ])
    // 头尾不与中间重叠
    const headIds = new Set(headNodes.map(item => item.id))
    const tailIds = new Set(tailNodes.map(item => item.id))
    expect(middleNodes.every(item => !headIds.has(item.id) && !tailIds.has(item.id))).toBe(true)
  })
})

describe('createWindow', () => {
  const sorted = sortNodesByDate(NODES)

  it('中间节点不足一个完整窗口时覆盖全部', () => {
    expect(createWindow(sorted, 277554)).toEqual({ start: 0, end: 6 })
  })

  it('焦点不存在时回退到从头开始', () => {
    expect(createWindow(sorted, 999999)).toEqual({ start: 0, end: 6 })
  })

  it('窗口足够时以焦点为中心', () => {
    const middle = Array.from({ length: 60 }, (_, i) => ({ ...NODES[0], id: 800000 + i }))
    // 焦点在索引 30, 半径 10 → [20, 41), 恰好 21 个不扩展
    expect(createWindow(middle, 800030)).toEqual({ start: 20, end: 41 })
  })

  it('焦点靠前时窗口向后扩展', () => {
    const middle = Array.from({ length: 60 }, (_, i) => ({ ...NODES[0], id: 800000 + i }))
    // 焦点在索引 2 → [0, 13) 只有 13 个, 补 8 个到末尾 → [0, 17)
    expect(createWindow(middle, 800002)).toEqual({ start: 0, end: 17 })
  })

  it('焦点靠后时窗口向前扩展', () => {
    const middle = Array.from({ length: 60 }, (_, i) => ({ ...NODES[0], id: 800000 + i }))
    // 焦点在索引 58 → [48, 60) 只有 12 个, 补 9 个到开头 → [44, 60)
    expect(createWindow(middle, 800058)).toEqual({ start: 44, end: 60 })
  })
})

describe('expandWindow', () => {
  it('顶部扩展不小于 0', () => {
    expect(expandWindow({ start: 20, end: 41 }, 60, 'top')).toEqual({ start: 0, end: 41 })
    expect(expandWindow({ start: 45, end: 50 }, 60, 'top')).toEqual({ start: 5, end: 50 })
  })

  it('底部扩展不超过节点总数', () => {
    expect(expandWindow({ start: 20, end: 41 }, 60, 'bottom')).toEqual({ start: 20, end: 60 })
    expect(expandWindow({ start: 5, end: 50 }, 60, 'bottom')).toEqual({ start: 5, end: 60 })
  })
})

describe('sliceWindow', () => {
  const sorted = sortNodesByDate(NODES)

  it('无窗口时显示全部, 无省略', () => {
    const { renderMiddleNodes, omittedTopCount, omittedBottomCount } = sliceWindow(sorted, null)
    expect(renderMiddleNodes).toHaveLength(6)
    expect(omittedTopCount).toBe(0)
    expect(omittedBottomCount).toBe(0)
  })

  it('按窗口切片并计算上下省略数', () => {
    const { renderMiddleNodes, omittedTopCount, omittedBottomCount } = sliceWindow(sorted, {
      start: 1,
      end: 4
    })
    expect(renderMiddleNodes.map(item => item.id)).toEqual([277554, 325585, 373247])
    expect(omittedTopCount).toBe(1)
    expect(omittedBottomCount).toBe(2)
  })
})

describe('groupNodesByYear', () => {
  it('按年份分组且年份升序', () => {
    const sorted = sortNodesByDate(NODES)
    const { nodesByYear, years } = groupNodesByYear(sorted)

    expect(years).toEqual(['2021', '2023', '2024', '2026'])
    expect(nodesByYear['2021'].map(item => item.id)).toEqual([419363, 277554, 325585])
    expect(nodesByYear['2026'].map(item => item.id)).toEqual([501963])
  })

  it('无日期归入未知且排最后', () => {
    const sorted = sortNodesByDate([...NODES, { ...NODES[0], id: 999999, date: '' }])
    const { years } = groupNodesByYear(sorted)

    expect(years).toEqual(['2021', '2023', '2024', '2026', '未知'])
  })
})

describe('getFocusRelations', () => {
  it('取焦点节点作为 src 的关联线', () => {
    expect(getFocusRelations(RELATES, 277554, [], 10)).toEqual([
      { relate: '续集', src: 277554, dst: 325585 },
      { relate: '衍生', src: 277554, dst: 419363 }
    ])
  })

  it('过滤隐藏的关系类型', () => {
    expect(getFocusRelations(RELATES, 277554, ['续集'], 10)).toEqual([
      { relate: '衍生', src: 277554, dst: 419363 }
    ])
  })

  it('按 maxRelations 截断', () => {
    expect(getFocusRelations(RELATES, 277554, [], 1)).toEqual([
      { relate: '续集', src: 277554, dst: 325585 }
    ])
  })

  it('无焦点时返回空', () => {
    expect(getFocusRelations(RELATES, 0, [], 10)).toEqual([])
  })
})

describe('splitRelationsBySide', () => {
  it('偶数索引在右, 奇数索引在左 (START_FROM_RIGHT)', () => {
    const relations = getFocusRelations(RELATES, 277554, [], 10)
    const { leftRelations, rightRelations } = splitRelationsBySide(relations)

    expect(rightRelations).toEqual([{ relate: '续集', src: 277554, dst: 325585 }])
    expect(leftRelations).toEqual([{ relate: '衍生', src: 277554, dst: 419363 }])
  })
})

describe('getScrollOffsetToNode', () => {
  const layout = { left: 0, right: 100, centerY: 500, height: 50 }

  it('节点中心上移到屏幕中上部', () => {
    // 500 - 800 / 2 + 80 = 180
    expect(getScrollOffsetToNode(layout)).toBe(180)
  })

  it('偏移为负时钳制为 0', () => {
    expect(getScrollOffsetToNode({ ...layout, centerY: 100 })).toBe(0)
  })
})
