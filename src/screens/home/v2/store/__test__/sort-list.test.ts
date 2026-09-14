/*
 * @Author: czy0729
 * @Date: 2026-08-08 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 00:46:26
 */
import { getSeasonKey, getTopMap, sortByIds } from '../utils'

import type { SubjectId } from '@types'
import type { UserCollectionItem } from '@utils/fetch.v0/types'

/** 构造最小收藏条目 */
function makeItem(
  subjectId: number,
  subject: Partial<{ air_date: string; eps_count: number }> = {}
) {
  return {
    name: `item-${subjectId}`,
    subject_id: subjectId,
    type: 2,
    ep_status: 0,
    vol_status: 0,
    lasttouch: 0,
    subject: {
      name: `item-${subjectId}`,
      name_cn: '',
      air_date: '',
      eps_count: 0,
      ...subject
    }
  } as unknown as UserCollectionItem
}

type CtxEntry = {
  air?: number
  onAirCustom?: { weekDay: number; isOnair: boolean }
  hasNewEp?: boolean
  hasAiredEp?: boolean
  isToday?: boolean
  isNextDay?: boolean
  watchedCount?: number
}

/** 按 subjectId 生成上下文, 未配置的字段返回默认值 */
function ctxByMap(map: Record<SubjectId, CtxEntry>) {
  const get = (id: SubjectId, key: keyof CtxEntry, fallback: any) => map[id]?.[key] ?? fallback
  return {
    topMap: {} as Record<SubjectId, number>,
    isWeb: false,
    sortOnAir: false,
    getAir: (id: SubjectId) => get(id, 'air', 0) as number,
    onAirCustom: (id: SubjectId) => get(id, 'onAirCustom', { weekDay: 0, isOnair: false }),
    hasNewEp: (id: SubjectId) => get(id, 'hasNewEp', false) as boolean,
    // 默认视为已有已放送章节, 即不参与「完全未播放」的年份下沉
    hasAiredEp: (id: SubjectId) => get(id, 'hasAiredEp', true) as boolean,
    isToday: (id: SubjectId) => get(id, 'isToday', false) as boolean,
    isNextDay: (id: SubjectId) => get(id, 'isNextDay', false) as boolean,
    watchedCount: (id: SubjectId) => get(id, 'watchedCount', 0) as number
  }
}

// ==================== 网页顺序 ====================
describe('sortByIds: 网页顺序 (isWeb)', () => {
  it('按置顶降序, 未置顶保持相对顺序', () => {
    const items = [makeItem(1), makeItem(2), makeItem(3), makeItem(4)]
    const result = sortByIds(items, {
      ...ctxByMap({}),
      topMap: getTopMap([3, 1]),
      isWeb: true
    })
    expect(result.map(item => item.subject_id)).toEqual([1, 3, 2, 4])
  })

  it('空置顶映射保持原始相对顺序', () => {
    const items = [makeItem(1), makeItem(2), makeItem(3)]
    const result = sortByIds(items, { ...ctxByMap({}), isWeb: true })
    expect(result.map(item => item.subject_id)).toEqual([1, 2, 3])
  })
})

// ==================== 放送顺序 ====================
describe('sortByIds: 放送顺序 (sortOnAir)', () => {
  const day = 3

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'getDay').mockReturnValue(day)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('放送中 > 本季有未看 > 往季有未看 > 默认', () => {
    const items = [
      makeItem(204, { air_date: '2025-04', eps_count: 12 }),
      makeItem(201, { air_date: '2026-04', eps_count: 12 }),
      makeItem(203, { air_date: '2025-04', eps_count: 12 }),
      makeItem(202, { air_date: '2026-04', eps_count: 12 })
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        201: { onAirCustom: { weekDay: day, isOnair: true }, hasNewEp: true, air: 5 },
        202: { hasNewEp: true, air: 3 },
        203: { hasNewEp: true },
        204: {}
      }),
      sortOnAir: true
    })
    expect(result.map(item => item.subject_id)).toEqual([201, 202, 203, 204])
  })

  it('看完下沉: 放送中但已看完的条目落到同季最下方', () => {
    ;(global as any).__mockStoreState__.homeSortSink = true
    const items = [
      makeItem(501, { air_date: '2026-04', eps_count: 12 }),
      makeItem(502, { air_date: '2026-04', eps_count: 12 })
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        501: { onAirCustom: { weekDay: day, isOnair: true }, hasNewEp: false, air: 12 },
        502: { hasNewEp: true, air: 3, watchedCount: 2 }
      }),
      sortOnAir: true
    })
    expect(result.map(item => item.subject_id)).toEqual([502, 501])
  })

  it('[回归] 星期天: 周日放送 > 周六放送', () => {
    jest.spyOn(Date.prototype, 'getDay').mockReturnValue(0)
    const items = [
      makeItem(901, { air_date: '2026-04', eps_count: 12 }),
      makeItem(902, { air_date: '2026-04', eps_count: 12 })
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        901: { onAirCustom: { weekDay: 6, isOnair: true }, hasNewEp: true, air: 5 },
        902: { onAirCustom: { weekDay: 7, isOnair: true }, hasNewEp: true, air: 5 }
      }),
      sortOnAir: true
    })
    expect(result.map(item => item.subject_id)).toEqual([902, 901])
  })
})

// ==================== 客户端顺序 ====================
describe('sortByIds: 客户端顺序 (默认)', () => {
  it('今天放送有未看 > 有未看 > 默认 (同季内)', () => {
    const items = [
      makeItem(303, { air_date: '2026-04', eps_count: 12 }),
      makeItem(301, { air_date: '2026-04', eps_count: 12 }),
      makeItem(302, { air_date: '2026-04', eps_count: 12 })
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        301: { isToday: true, hasNewEp: true, air: 5, watchedCount: 2 },
        302: { hasNewEp: true, air: 3, watchedCount: 1 },
        303: {}
      })
    })
    expect(result.map(item => item.subject_id)).toEqual([301, 302, 303])
  })

  it('seasonKey 越近越大优先于是否有未看', () => {
    const items = [
      makeItem(401, { air_date: '2025-04', eps_count: 12 }),
      makeItem(402, { air_date: '2026-04', eps_count: 12 })
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        401: { hasNewEp: true, air: 3 },
        402: {}
      })
    })
    expect(result.map(item => item.subject_id)).toEqual([402, 401])
  })

  it('置顶优先于权重', () => {
    const items = [makeItem(501), makeItem(502)]
    const result = sortByIds(items, {
      ...ctxByMap({
        501: { isToday: true, hasNewEp: true, air: 5, watchedCount: 0 },
        502: {}
      }),
      topMap: { 502: 5 }
    })
    expect(result.map(item => item.subject_id)).toEqual([502, 501])
  })

  it('完全未播放: 沉到在播番之后, 但仍高于上一年', () => {
    ;(global as any).__mockStoreState__.homeSortSink = true
    const items = [
      makeItem(701, { air_date: '2026-10', eps_count: 12 }), // 未来季, 一集都没放
      makeItem(702, { air_date: '2026-07', eps_count: 12 }), // 在播
      makeItem(703, { air_date: '2025-10', eps_count: 12 }) // 往年
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        701: { hasAiredEp: false },
        702: { hasNewEp: true, air: 3, watchedCount: 1 },
        703: { hasNewEp: true, air: 8, watchedCount: 2 }
      }),
      currentSeasonKey: getSeasonKey('2026-09')
    })
    expect(result.map(item => item.subject_id)).toEqual([702, 701, 703])
  })

  it('[回归] 未来季但有已放送章节 (提前放送) 不下沉, 保持季度优先', () => {
    ;(global as any).__mockStoreState__.homeSortSink = true
    const items = [
      makeItem(801, { air_date: '2026-10', eps_count: 12 }), // 未来季, 但已有 ep 提前放送
      makeItem(802, { air_date: '2026-07', eps_count: 12 }) // 在播
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        801: { hasAiredEp: true, hasNewEp: true, air: 1, watchedCount: 0 },
        802: { hasAiredEp: true, hasNewEp: true, air: 3, watchedCount: 1 }
      }),
      currentSeasonKey: getSeasonKey('2026-09')
    })
    expect(result.map(item => item.subject_id)).toEqual([801, 802])
  })

  it('[回归] 跨年: 未开播的 2027 冬沉到 2027 组底部, 年份仍优先于 2026 全年', () => {
    ;(global as any).__mockStoreState__.homeSortSink = true
    const items = [
      makeItem(901, { air_date: '2027-01', eps_count: 12 }), // 未开播
      makeItem(902, { air_date: '2026-10', eps_count: 12 }), // 未开播
      makeItem(903, { air_date: '2026-07', eps_count: 12 }) // 在播
    ]
    const result = sortByIds(items, {
      ...ctxByMap({
        901: { hasAiredEp: false },
        902: { hasAiredEp: false },
        903: { hasNewEp: true, air: 3, watchedCount: 1 }
      }),
      currentSeasonKey: getSeasonKey('2026-09')
    })
    expect(result.map(item => item.subject_id)).toEqual([901, 903, 902])
  })
})

// ==================== 兜底 ====================
describe('sortByIds: 兜底', () => {
  it('onAirCustom 抛异常时按置顶 + 今天放送降序', () => {
    const items = [makeItem(601), makeItem(602)]
    const result = sortByIds(items, {
      topMap: {},
      isWeb: false,
      sortOnAir: true,
      getAir: () => 0,
      onAirCustom: () => {
        throw new Error('boom')
      },
      hasNewEp: () => false,
      isToday: subjectId => subjectId === 601,
      isNextDay: () => false,
      watchedCount: () => 0
    })
    expect(result.map(item => item.subject_id)).toEqual([601, 602])
  })
})

// ==================== 通用 ====================
describe('sortByIds: 通用', () => {
  it('空列表返回冻结的空数组', () => {
    const result = sortByIds([], { ...ctxByMap({}) })
    expect(result).toEqual([])
    expect(Object.isFrozen(result)).toBe(true)
  })

  it('不修改原数组', () => {
    const items = [makeItem(1), makeItem(2), makeItem(3)]
    const original = [...items]
    sortByIds(items, { ...ctxByMap({}), isWeb: true })
    expect(items).toEqual(original)
  })
})
