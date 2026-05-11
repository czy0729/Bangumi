/*
 * @Author: czy0729
 * @Date: 2026-05-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 10:00:00
 */
import { desc, findLastIndex, freeze } from '@utils'

import type { SubjectId } from '@types'
import type { UserCollectionItem } from '@stores/user/types'
import type { Ep } from '@stores/subject/types'

/** 获取置顶映射 */
export function getTopMap(topList: SubjectId[]) {
  return topList.reduce<Record<SubjectId, number>>((map, subjectId, index) => {
    map[subjectId] = index + 1
    return map
  }, {})
}

/** 排除 SP 章节 */
export function getEpsNoSp(eps: readonly Ep[] | undefined) {
  return (eps || []).filter(item => item.type === 0)
}

/** 计算已看章节数量（排除 SP） */
export function getWatchedCount(
  userProgress: Record<string, string>,
  eps: readonly Ep[] | undefined
) {
  const epsMap: Record<string, boolean> = {}
  eps.forEach(item => {
    if (item.type !== 1) epsMap[item.id] = true
  })

  let count = 0
  Object.keys(userProgress).forEach(item => {
    if (epsMap[item] && userProgress[item] === '看过') count += 1
  })
  return count
}

/** 获取第一个未看章节的索引 */
export function getFirstUnwatchedIndex(eps: Ep[], userProgress: Record<string, string>) {
  return eps.findIndex(item => userProgress[item.id] !== '看过')
}

/** 获取最后一个已看章节的索引 */
export function getLastWatchedIndex(eps: Ep[], userProgress: Record<string, string>) {
  return findLastIndex(eps, (item: Ep) => userProgress[item.id] === '看过')
}

/** 判断是否今天放送 */
export function isOnairToday(weekDay: number, isOnair: boolean) {
  if (!isOnair) return false
  const day = new Date().getDay()
  return weekDay === day
}

/** 判断是否明天放送 */
export function isOnairNextDay(weekDay: number, isOnair: boolean) {
  if (!isOnair) return false
  const day = new Date().getDay()
  return day === 6 ? weekDay === 0 : day === weekDay - 1
}

/** 计算排序权重（放送顺序模式） */
export function calcSortWeightOnair(options: {
  weekDay: number
  isOnair: boolean
  day: number
  hasNewEp: boolean
  homeSortSink: boolean
}) {
  const { weekDay, isOnair, day, hasNewEp, homeSortSink } = options

  let weight = 1
  if (isOnair) {
    if (isOnairToday(weekDay, isOnair)) {
      weight = 1001
    } else if (isOnairNextDay(weekDay, isOnair)) {
      weight = 1000
    } else if (day === 0) {
      weight = 100 - weekDay
    } else if (weekDay >= day) {
      weight = 100 - weekDay
    } else {
      weight = 10 - weekDay
    }
  }

  // 看完下沉逻辑
  if (homeSortSink && !hasNewEp) weight -= 10000

  return weight
}

/** 计算排序权重（客户端顺序模式） */
export function calcSortWeightClient(options: {
  isToday: boolean
  isNextDay: boolean
  air: number
  watchedCount: number
  hasNewEp: boolean
  homeSortSink: boolean
}) {
  const { isToday, isNextDay, air, watchedCount, hasNewEp, homeSortSink } = options

  let weight = 1
  if (isToday) {
    weight = air > watchedCount ? 100000 : 10000
  } else if (isNextDay) {
    weight = air > watchedCount ? 1000 : 100
  } else {
    weight = air > watchedCount ? 10 : 1
  }

  // 看完下沉逻辑
  if (homeSortSink && !hasNewEp) weight -= 100001

  return weight
}

/** 对列表进行排序（按置顶优先） */
export function sortByTop(list: UserCollectionItem[], topMap: Record<SubjectId, number>) {
  return freeze(list.slice().sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0)))
}
