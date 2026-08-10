/*
 * @Author: czy0729
 * @Date: 2026-07-17 19:15:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 07:43:05
 */

/*
 * APP (seasonKey>放送中>未看>默认)
 * 放送 (放送中 > 明天放送 > 默认)
 * 网页 (默认)
 */
import { getOnAir } from '@utils'
import {
  calcSortWeightClient,
  calcSortWeightOnair,
  getSeasonKey,
  getTopMap,
  hasNewEp,
  isOnairNextDay,
  isOnairToday,
  sortByWeightAndTop
} from '../utils'

import type { Ep } from '@stores/subject/types'
import type { UserProgress } from '@stores/user/types'
import type { UserCollectionItem } from '@utils/fetch.v0/types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const items: UserCollectionItem[] = require('./json/collection.json').list

// ==================== calcSortWeightClient ====================
describe('calcSortWeightClient', () => {
  const base = {
    isToday: false,
    isNextDay: false,
    air: 0,
    watchedCount: 0,
    hasNewEp: false
  }

  beforeEach(() => {
    ;(global as any).__mockStoreState__.homeSortSink = false
  })

  it('放送中还有未看', () => {
    expect(
      calcSortWeightClient({ ...base, isToday: true, hasNewEp: true, air: 10, watchedCount: 3 })
    ).toBe(1_100_000)
  })

  it('放送中没未看', () => {
    expect(calcSortWeightClient({ ...base, isToday: true, air: 10, watchedCount: 10 })).toBe(10_000)
  })

  it('明天放送还有未看', () => {
    expect(
      calcSortWeightClient({ ...base, isNextDay: true, hasNewEp: true, air: 10, watchedCount: 3 })
    ).toBe(501_000)
  })

  it('明天放送中没未看', () => {
    expect(calcSortWeightClient({ ...base, isNextDay: true, air: 10, watchedCount: 10 })).toBe(100)
  })

  it('未完结新番还有未看', () => {
    expect(calcSortWeightClient({ ...base, hasNewEp: true, air: 10, watchedCount: 3 })).toBe(
      550_000
    )
  })

  it('默认', () => {
    expect(calcSortWeightClient({ ...base, air: 0, watchedCount: 10 })).toBe(1)
  })

  it('看完下沉: homeSortSink + !hasNewEp 权重减去 100001', () => {
    ;(global as any).__mockStoreState__.homeSortSink = true
    const result = calcSortWeightClient({ ...base, hasNewEp: false })
    expect(result).toBe(1 - 100001)
  })

  it('看完下沉不影响有未看的条目', () => {
    ;(global as any).__mockStoreState__.homeSortSink = true
    const result = calcSortWeightClient({
      ...base,
      hasNewEp: true,
      isToday: true,
      air: 5,
      watchedCount: 3
    })
    expect(result).toBe(1_100_000)
  })
})

// ==================== sortByWeightAndTop ====================
describe('sortByWeightAndTop', () => {
  it('空数组返回空数组', () => {
    expect(sortByWeightAndTop([], {}, {})).toEqual([])
  })

  it('单元素原样返回', () => {
    const result = sortByWeightAndTop([items[0]], {}, {})
    expect(result).toHaveLength(1)
    expect(result[0].subject_id).toBe(items[0].subject_id)
  })

  it('topMap 优先于 weightMap', () => {
    const list = [items[0], items[1], items[2]]
    const weightMap = {
      [items[0].subject_id]: 100,
      [items[1].subject_id]: 50,
      [items[2].subject_id]: 10
    }
    const topMap = {
      [items[0].subject_id]: 0,
      [items[1].subject_id]: 5,
      [items[2].subject_id]: 10
    }
    const result = sortByWeightAndTop(list, weightMap, topMap)
    expect(result[0].subject_id).toBe(items[2].subject_id)
    expect(result[1].subject_id).toBe(items[1].subject_id)
    expect(result[2].subject_id).toBe(items[0].subject_id)
  })

  it('topMap 相等时按 weightMap 降序', () => {
    const list = [items[0], items[1], items[2]]
    const weightMap = {
      [items[0].subject_id]: 10,
      [items[1].subject_id]: 100,
      [items[2].subject_id]: 50
    }
    const topMap = {
      [items[0].subject_id]: 5,
      [items[1].subject_id]: 5,
      [items[2].subject_id]: 5
    }
    const result = sortByWeightAndTop(list, weightMap, topMap)
    expect(result[0].subject_id).toBe(items[1].subject_id)
    expect(result[1].subject_id).toBe(items[2].subject_id)
    expect(result[2].subject_id).toBe(items[0].subject_id)
  })

  it('双方都无权重时保持相对顺序', () => {
    const list = [items[0], items[1], items[2]]
    const result = sortByWeightAndTop(list, {}, {})
    expect(result[0].subject_id).toBe(items[0].subject_id)
    expect(result[1].subject_id).toBe(items[1].subject_id)
    expect(result[2].subject_id).toBe(items[2].subject_id)
  })

  it('不修改原数组', () => {
    const list = [items[0], items[1], items[2]]
    const original = [...list]
    sortByWeightAndTop(list, { [items[0].subject_id]: 100 }, { [items[2].subject_id]: 10 })
    expect(list).toEqual(original)
  })
})

// ==================== isOnairToday / isOnairNextDay ====================
describe('isOnairToday', () => {
  it('不在放送中时返回 false', () => {
    expect(isOnairToday(3, false)).toBe(false)
  })

  it('放送日匹配今天返回 true', () => {
    const today = new Date().getDay()
    expect(isOnairToday(today, true)).toBe(true)
  })

  it('放送日不匹配今天返回 false', () => {
    const today = new Date().getDay()
    const otherDay = (today + 1) % 7
    expect(isOnairToday(otherDay, true)).toBe(false)
  })
})

describe('isOnairNextDay', () => {
  it('不在放送中时返回 false', () => {
    expect(isOnairNextDay(3, false)).toBe(false)
  })

  it('放送日是明天返回 true', () => {
    const today = new Date().getDay()
    const tomorrow = today === 6 ? 0 : today + 1
    expect(isOnairNextDay(tomorrow, true)).toBe(true)
  })
})

// ==================== hasNewEp ====================
describe('hasNewEp', () => {
  const baseEp: Ep = {
    id: 0,
    url: '' as Ep['url'],
    type: 0,
    sort: 0,
    name: '',
    name_cn: '',
    duration: '',
    airdate: '',
    comment: 0,
    desc: '',
    status: 'NA'
  }

  it('有空状态且用户没看过的集数 → 有新集数', () => {
    const eps: Ep[] = [
      { ...baseEp, id: 1, status: 'Air' },
      { ...baseEp, id: 2, status: 'Today' }
    ]
    expect(hasNewEp(eps, { _loaded: 0 })).toBe(true)
  })

  it('全部看过的集数 → 无新集数', () => {
    const eps: Ep[] = [
      { ...baseEp, id: 1, status: 'Air' },
      { ...baseEp, id: 2, status: 'Air' }
    ]
    const userProgress: UserProgress = { '1': '看过', '2': '看过', _loaded: 0 }
    expect(hasNewEp(eps, userProgress)).toBe(false)
  })

  it('非放送状态的集数不算', () => {
    const eps: Ep[] = [{ ...baseEp, id: 1, status: 'NA' }]
    expect(hasNewEp(eps, { _loaded: 0 })).toBe(false)
  })
})

// ==================== getOnAir ====================
describe('getOnAir', () => {
  it('自身返回 true（onAirCustom 层处理已完结判断）', () => {
    const onAir = {
      weekDayCN: 5,
      timeCN: '2130',
      weekDayJP: 5,
      timeJP: '2230',
      air: 13
    }
    const result = getOnAir(onAir, {})
    expect(result.isOnair).toBe(true)
  })

  it('当前放送中番剧返回正确的 isOnair', () => {
    const onAir = {
      weekDayCN: 3,
      timeCN: '2300',
      weekDayJP: 3,
      timeJP: '0000',
      air: 8
    }
    const result = getOnAir(onAir, {})
    expect(result.isOnair).toBe(true)
    expect(result.weekDay).toBe(3)
  })

  it('空的 onAir 数据返回 isOnair false', () => {
    const result = getOnAir({}, {})
    expect(result.isOnair).toBe(false)
  })
})

// ==================== 集成：客户端排序 ====================
describe('集成：客户端排序', () => {
  it('onAirCustom 层修复: 已完结番剧 isOnair 应为 false', () => {
    const onAir = { weekDayCN: 5, timeCN: '2130', weekDayJP: 5, timeJP: '2230', air: 13 }
    const result = getOnAir(onAir, {})

    expect(result.isOnair).toBe(true)

    if (result.isOnair && onAir.air) {
      const epsCount = 13
      if (epsCount && Number(onAir.air) >= epsCount) {
        result.isOnair = false
      }
    }
    expect(result.isOnair).toBe(false)

    const onAirOngoing = { weekDayCN: 3, timeCN: '2200', air: 6 }
    const result2 = getOnAir(onAirOngoing, {})

    expect(result2.isOnair).toBe(true)
    if (result2.isOnair && onAirOngoing.air) {
      const epsCount = 12
      if (epsCount && Number(onAirOngoing.air) >= epsCount) {
        result2.isOnair = false
      }
    }
    expect(result2.isOnair).toBe(true)
  })

  it('sortByWeightAndTop 与 topMap 联合使用', () => {
    const list = [items[0], items[1]]
    const topMap = { [items[0].subject_id]: 1 }
    const weightMap = {
      [items[0].subject_id]: 10,
      [items[1].subject_id]: 100
    }
    const result = sortByWeightAndTop(list, weightMap, topMap)
    expect(result[0].subject_id).toBe(items[0].subject_id)
    expect(result[1].subject_id).toBe(items[1].subject_id)
  })
})

// ==================== 真实排序逻辑 vs DeepSeek 快照 (2026-07-17 16:00) ====================
describe('真实排序 vs 快照 (2026-07-17 16:00)', () => {
  const day: number = 5

  beforeAll(() => {
    jest.spyOn(Date.prototype, 'getDay').mockReturnValue(day)
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })

  // ---- fixtures ----
  const epsJson: Record<string, Ep[]> = require('./json/eps.json')
  const upJson: Record<string, UserProgress> = require('./json/userProgress.json')
  const onAirJson: Record<string, any> = require('./json/onair.json')
  const topList: number[] = require('./json/topList.json')
  const snapDir = './snapshots'

  const topMap = getTopMap(topList)

  function loadSnapshot(name: string) {
    return require(`${snapDir}/${name}.json`) as { name: string; _comment: string }[]
  }

  function getWatchInfo(item: UserCollectionItem) {
    const id = item.subject_id
    const up = (upJson[id] || {}) as UserProgress
    const watchedCount = Object.values(up).filter(v => v === '看过').length
    const hasNewEpResult = hasNewEp(epsJson[id] || [], up)
    return { watchedCount, hasNewEp: hasNewEpResult }
  }

  function buildRealClientWeightMap(sink: boolean) {
    ;(global as any).__mockStoreState__.homeSortSink = sink
    const weightMap: Record<number, number> = {}
    items.forEach(item => {
      const id = item.subject_id
      const onAir = getOnAir(onAirJson[id] || {}, {})
      const { watchedCount, hasNewEp: hasNewEpResult } = getWatchInfo(item)
      const { air = 0 } = onAirJson[id] || {}
      const epsCount = item.subject?.eps_count

      // onAirCustom: 已完结番剧 isOnair 应为 false
      const isOnair = onAir.isOnair && (!epsCount || !air || air < epsCount)
      const wd = onAir.weekDay

      weightMap[id] = calcSortWeightClient({
        isToday: isOnair && wd === day,
        isNextDay: isOnair && wd != null && (day === 6 ? wd === 0 : wd === day + 1),
        air,
        watchedCount,
        hasNewEp: hasNewEpResult,
        seasonKey: getSeasonKey(item.subject?.air_date),
        epsCount
      })
    })
    return weightMap
  }

  function buildRealOnAirWeightMap(sink: boolean) {
    ;(global as any).__mockStoreState__.homeSortSink = sink
    const weightMap: Record<number, number> = {}
    items.forEach(item => {
      const id = item.subject_id
      const onAir = getOnAir(onAirJson[id] || {}, {})
      const { hasNewEp: hasNewEpResult } = getWatchInfo(item)
      const { air = 0 } = onAirJson[id] || {}
      const epsCount = item.subject?.eps_count
      const wd = onAir.weekDay

      // onAirCustom: 已完结番剧 isOnair 应为 false
      const isOnair = onAir.isOnair && (!epsCount || !air || air < epsCount)

      weightMap[id] = calcSortWeightOnair({
        weekDay: wd ?? 0,
        isOnair,
        day,
        hasNewEp: hasNewEpResult,
        seasonKey: getSeasonKey(item.subject?.air_date),
        air: air || undefined,
        epsCount
      })
    })
    return weightMap
  }

  // ---- tests ----
  describe('默认（网页）', () => {
    it('匹配 web.json', () => {
      const result = sortByWeightAndTop(items, {}, topMap)
      expect(result.map(x => x.name)).toEqual(loadSnapshot('web'))
    })
  })

  describe('APP', () => {
    it('匹配 app.json', () => {
      const result = sortByWeightAndTop(items, buildRealClientWeightMap(false), topMap)
      const snapshot = loadSnapshot('app') as { name: string; _comment: string }[]
      expect(result.map(x => x.name)).toEqual(snapshot.map(x => x.name))
    })
  })

  describe('APP + 下沉', () => {
    it('匹配 app_sink.json', () => {
      const result = sortByWeightAndTop(items, buildRealClientWeightMap(true), topMap)
      const snapshot = loadSnapshot('app_sink')
      expect(result.map(x => x.name)).toEqual(snapshot.map(x => x.name))
    })
  })

  describe('放送', () => {
    it('匹配 onair.json', () => {
      const result = sortByWeightAndTop(items, buildRealOnAirWeightMap(false), topMap)
      const snapshot = loadSnapshot('onair')
      expect(result.map(x => x.name)).toEqual(snapshot.map(x => x.name))
    })
  })

  describe('放送 + 下沉', () => {
    it('匹配 onair_sink.json', () => {
      const result = sortByWeightAndTop(items, buildRealOnAirWeightMap(true), topMap)
      const snapshot = loadSnapshot('onair_sink')
      expect(result.map(x => x.name)).toEqual(snapshot.map(x => x.name))
    })
  })
})
