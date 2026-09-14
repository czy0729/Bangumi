/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 00:46:12
 */
import { systemStore } from '@stores'
import { desc, freeze } from '@utils'
import { getDaysUntilNext, isOnairNextDay, isOnairToday } from './date'

import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type { SubjectId } from '@types'

/** 获取置顶映射 */
export function getTopMap(topList: SubjectId[]) {
  return topList.reduce<Record<SubjectId, number>>((map, subjectId, index) => {
    map[subjectId] = index + 1
    return map
  }, {})
}

/** 获取条目所属季度的连续键值（year*4+quarter，越大越新） */
export function getSeasonKey(airDate: string | undefined): number {
  if (!airDate || typeof airDate !== 'string') return 0
  const m = airDate.match(/^(\d{4})-(\d{2})/)
  if (!m) return 0
  const year = parseInt(m[1])
  const quarter = Math.ceil(parseInt(m[2]) / 3)
  return year * 4 + quarter
}

/** 获取当前季度的连续键值（与 getSeasonKey 同口径） */
export function getCurrentSeasonKey(): number {
  const now = new Date()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  return getSeasonKey(`${now.getFullYear()}-${month}`)
}

/** 所属年份分组的底部键值（年*4+0.5，落在该年最后季度与下一年第一季度之间） */
export function toYearBottomSeasonKey(seasonKey: number): number {
  // seasonKey = year*4 + quarter (quarter 为 1-4), 故年份需用 (seasonKey-1)/4 取整
  return Math.floor((seasonKey - 1) / 4) * 4 + 0.5
}

/**
 * 计算参与 seasonBoost 的季度键值
 * - 完全未播放 (没有任何已放送章节) 且所属季度尚未开始时, 沉到所属年份分组底部
 * - 其余情况沿用原键值
 */
function resolveSeasonKey(
  seasonKey: number,
  hasAiredEp: boolean,
  currentSeasonKey?: number
): number {
  if (!systemStore.setting.homeSortSink || hasAiredEp) return seasonKey
  if (seasonKey <= (currentSeasonKey ?? getCurrentSeasonKey())) return seasonKey

  return toYearBottomSeasonKey(seasonKey)
}

/** 计算排序权重（放送顺序模式）
 *
 *  层级: 放送中(巨量boost) >>> 非放送中(seasonKey > 未看 > 默认) */
export function calcSortWeightOnair(options: {
  weekDay: string | number
  isOnair: boolean
  day: number
  hasNewEp: boolean
  seasonKey?: number
  air?: number
  epsCount?: number
  hasAiredEp?: boolean
  currentSeasonKey?: number
}) {
  const {
    weekDay,
    isOnair,
    hasNewEp,
    seasonKey = 0,
    air,
    epsCount,
    hasAiredEp = true,
    currentSeasonKey
  } = options

  // 看完下沉优先: 已沉底的条目不参与放送中排序, 走 APP 逻辑落到同季最下方
  // (其中完全未播放的条目会进一步沉到所属年份分组最下方)
  if (systemStore.setting.homeSortSink && !hasNewEp)
    return calcSortWeightClient({
      isToday: false,
      isNextDay: false,
      air: air || 0,
      watchedCount: 0,
      hasNewEp,
      seasonKey,
      epsCount,
      hasAiredEp,
      currentSeasonKey
    })

  if (isOnair) {
    let timingWeight = 1
    if (isOnairToday(weekDay, isOnair)) {
      timingWeight = 1001
    } else if (isOnairNextDay(weekDay, isOnair)) {
      timingWeight = 1000
    } else {
      timingWeight = 1000 - getDaysUntilNext(weekDay)
    }
    return 1_000_000_000_000 + timingWeight
  }

  // 非放送中: APP 默认 + 细节
  const seasonBoost = resolveSeasonKey(seasonKey, hasAiredEp, currentSeasonKey) * 10_000_000
  const tierBoost = hasNewEp ? 500_000 : 0
  let cdnWeight = 1
  if (air && (!epsCount || air < epsCount) && hasNewEp) {
    cdnWeight = 50000
  }
  if (systemStore.setting.homeSortSink && !hasNewEp) cdnWeight -= 100001
  return seasonBoost + tierBoost + cdnWeight
}

/** 计算排序权重（客户端顺序模式）
 *
 *  层级: seasonKey (越近越大) >>> tierBoost (放送中 > 未看 > 默认) > cdnWeight (细节)
 *  完全未播放的条目季键值降为所属年份分组底部 (见 resolveSeasonKey) */
export function calcSortWeightClient(options: {
  isToday: boolean
  isNextDay: boolean
  air: number
  watchedCount: number
  hasNewEp: boolean
  seasonKey?: number
  epsCount?: number
  hasAiredEp?: boolean
  currentSeasonKey?: number
}) {
  const {
    isToday,
    isNextDay,
    air,
    watchedCount,
    hasNewEp,
    seasonKey = 0,
    epsCount,
    hasAiredEp = true,
    currentSeasonKey
  } = options

  const seasonBoost = resolveSeasonKey(seasonKey, hasAiredEp, currentSeasonKey) * 10_000_000

  let tierBoost = 0
  if (isToday && hasNewEp) {
    tierBoost = 1_000_000
  } else if (hasNewEp) {
    tierBoost = 500_000
  }

  let cdnWeight = 1
  if (isToday) {
    cdnWeight = air > watchedCount ? 100000 : 10000
  } else if (isNextDay) {
    cdnWeight = air > watchedCount ? 1000 : 100
  } else if (air > 0 && (!epsCount || air < epsCount) && hasNewEp) {
    cdnWeight = 50000
  } else {
    cdnWeight = air > watchedCount ? 10 : 1
  }

  if (systemStore.setting.homeSortSink && !hasNewEp) cdnWeight -= 100001

  return seasonBoost + tierBoost + cdnWeight
}

/** 按权重和置顶排序 */
export function sortByWeightAndTop(
  list: UserCollectionItem[],
  weightMap: Record<number, number>,
  topMap: Record<SubjectId, number>
) {
  return list
    .slice()
    .map(
      item =>
        [item, topMap[item.subject_id] || 0, weightMap[item.subject_id]] as [
          UserCollectionItem,
          number,
          number
        ]
    )
    .sort(([, t1, w1], [, t2, w2]) => {
      const r1 = desc(t1, t2)
      if (r1 !== 0) return r1
      return desc(w1, w2)
    })
    .map(([item]) => item)
}

/**
 * 按列表排序（网页 / 放送 / 客户端顺序）
 * 优先度从上到下: 放送中还有未看 > 放送中没未看 > 明天放送还有未看 > 明天放送没未看 > 未完结新番还有未看 > 默认
 * */
export function sortByIds(
  list: UserCollectionItem[],
  options: {
    topMap: Record<SubjectId, number>
    isWeb: boolean
    sortOnAir: boolean
    getAir: (subjectId: SubjectId) => number
    onAirCustom: (subjectId: SubjectId) => { weekDay: string | number; isOnair: boolean }
    hasNewEp: (subjectId: SubjectId) => boolean
    hasAiredEp: (subjectId: SubjectId) => boolean
    isToday: (subjectId: SubjectId) => boolean
    isNextDay: (subjectId: SubjectId) => boolean
    watchedCount: (subjectId: SubjectId) => number
    currentSeasonKey?: number
  }
): UserCollectionItem[] {
  const {
    topMap,
    isWeb,
    sortOnAir,
    getAir,
    onAirCustom,
    hasNewEp,
    hasAiredEp,
    isToday,
    isNextDay,
    watchedCount
  } = options

  // 只计算一次当前季键值, 避免逐条目取时间
  const currentSeasonKey = options.currentSeasonKey ?? getCurrentSeasonKey()

  if (!list?.length) return freeze([]) as UserCollectionItem[]

  // 网页顺序: 不需要处理
  if (isWeb) {
    return freeze(
      list
        .slice()
        .map(item => [item, topMap[item.subject_id] || 0] as [UserCollectionItem, number])
        .sort(([, a], [, b]) => desc(a, b))
        .map(([item]) => item)
    ) as UserCollectionItem[]
  }

  try {
    // 计算每一个条目看过章节的数量
    const weightMap: Record<number, number> = {}

    // 放送顺序: 本季优先, 其次 CDN 放送中, 其次星期顺序
    if (sortOnAir) {
      const day = new Date().getDay()
      list.forEach(item => {
        const { subject_id: subjectId } = item
        const { weekDay, isOnair } = onAirCustom(subjectId)
        const air = getAir(subjectId)
        weightMap[subjectId] = calcSortWeightOnair({
          weekDay,
          isOnair,
          day,
          hasNewEp: hasNewEp(subjectId),
          seasonKey: getSeasonKey(item.subject?.air_date),
          air,
          epsCount: item.subject?.eps_count,
          hasAiredEp: hasAiredEp(subjectId),
          currentSeasonKey
        })
      })
      return freeze(sortByWeightAndTop(list, weightMap, topMap)) as UserCollectionItem[]
    }

    // 客户端顺序：按 seasonKey 分组（越近越大） > 放送中/未看/默认
    list.forEach(item => {
      const { subject_id: subjectId } = item
      const air = getAir(subjectId)
      weightMap[subjectId] = calcSortWeightClient({
        isToday: isToday(subjectId),
        isNextDay: isNextDay(subjectId),
        air,
        watchedCount: watchedCount(subjectId),
        hasNewEp: hasNewEp(subjectId),
        seasonKey: getSeasonKey(item.subject?.air_date),
        epsCount: item.subject?.eps_count,
        hasAiredEp: hasAiredEp(subjectId),
        currentSeasonKey
      })
    })
    return freeze(sortByWeightAndTop(list, weightMap, topMap)) as UserCollectionItem[]
  } catch {}

  return freeze(
    list
      .slice()
      .map(
        item =>
          [item, topMap[item.subject_id] || 0, isToday(item.subject_id)] as [
            UserCollectionItem,
            number,
            boolean
          ]
      )
      .sort(([, t1, d1], [, t2, d2]) => {
        const r1 = desc(t1, t2)
        if (r1 !== 0) return r1
        return desc(Number(d1), Number(d2))
      })
      .map(([item]) => item)
  ) as UserCollectionItem[]
}
