/*
 * @Author: czy0729
 * @Date: 2026-05-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 10:00:00
 */
import { systemStore, userStore } from '@stores'
import { desc, findLastIndex, getPinYinFilterValue, x18 } from '@utils'
import { getOriginConfig } from '@src/screens/user/origin-setting/utils'
import { TABS_ITEM } from '../ds'

import type { UserProgress } from '@stores/user/types'
import type { Ep } from '@stores/subject/types'
import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type { SubjectId } from '@types'
import type { Tabs } from '../types'

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

/** 获取排除 SP 章节的数量 */
export function getEpsCount(
  subject: { eps?: readonly Ep[]; eps_count?: number },
  filterZero = true
) {
  try {
    if (subject?.eps && typeof subject.eps === 'object') {
      const { length } = subject.eps.filter(item => {
        if (filterZero) return item.type === 0 && item.sort != 0
        return item.type === 0
      })
      if (length) return length
    }

    if (subject?.eps_count) return subject.eps_count

    return 0
  } catch {
    return subject?.eps_count || 0
  }
}

/** 计算已看章节数量（排除 SP） */
export function getWatchedCount(userProgress: UserProgress, eps: readonly Ep[] | undefined) {
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
export function getFirstUnwatchedIndex(eps: Ep[], userProgress: UserProgress) {
  return eps.findIndex(item => userProgress[item.id] !== '看过')
}

/** 获取最后一个已看章节的索引 */
export function getLastWatchedIndex(eps: Ep[], userProgress: UserProgress) {
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

/** 按权重和置顶排序 */
export function sortByWeightAndTop(
  list: UserCollectionItem[],
  weightMap: Record<number, number>,
  topMap: Record<SubjectId, number>
) {
  return list
    .slice()
    .sort((a, b) => desc(a, b, item => weightMap[item.subject_id]))
    .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
}

/** 获取 Tabs 配置 */
export function getTabs() {
  const tabs: Tabs = systemStore.setting.homeTabs.map(item => TABS_ITEM[item]).filter(Boolean)
  if (systemStore.setting.showGame) tabs.push(TABS_ITEM.game)
  return tabs
}

/** 获取在看的用户收藏（过滤限制内容） */
export function getCollection() {
  if (!userStore.isLimit) return userStore.collection

  return {
    ...userStore.collection,
    list: userStore.collection.list.filter(item => !x18(item.subject_id, item.name))
  }
}

/** 获取条目用于过滤的中文名 */
export function getSubjectFilterName(subjectNameCn: string | undefined, item: UserCollectionItem) {
  return (
    subjectNameCn ||
    item?.subject?.name_cn ||
    item.name ||
    item?.subject?.name ||
    ''
  ).toUpperCase()
}

/** 检查条目名称是否匹配过滤条件 */
export function matchFilter(name: string, filter: string) {
  return name.includes(filter) || getPinYinFilterValue(name, filter)
}

/** 获取下一个未看章节 */
export function getNextWatchEp(eps: Ep[], userProgress: UserProgress) {
  const index = getFirstUnwatchedIndex(eps, userProgress)
  if (index === -1) return {}
  return eps[index]
}

/** 获取当前放送的章节集数 */
export function getCurrentOnAir(eps: readonly Ep[]) {
  const reversed = eps.slice().reverse()

  // 若第一集为第 0 集, +1
  const flagZero = reversed.length && reversed[reversed.length - 1].sort === 0
  const current = reversed.find(item => item.status === 'Air')?.sort || 0
  return flagZero && current ? current + 1 : current
}

/** 判断章节是否从第 0 集开始 */
export function isZeroBasedEps(eps: readonly Ep[]) {
  return eps.length > 0 && eps[0].sort === 0
}

/** 获取最后一个已看章节的集数 */
export function getLastWatchedSort(eps: readonly Ep[], userProgress: UserProgress) {
  const reversed = eps.slice().reverse()
  const item = reversed.find(item => userProgress[item.id] === '看过')
  if (!item) return undefined

  return isZeroBasedEps(eps) ? item.sort + 1 : item.sort
}

/** 检查是否存在未看的新章节 */
export function hasNewEp(eps: readonly Ep[], userProgress: UserProgress) {
  return eps.some(
    item => (item.status === 'Air' || item.status === 'Today') && !(item.id in userProgress)
  )
}

/** 获取可见的章节范围 */
export function getVisibleEps(eps: Ep[], userProgress: UserProgress, maxLength: number) {
  const { length } = eps
  if (length <= maxLength) return eps

  // 第一个不为看过章节按钮的位置
  const index = getFirstUnwatchedIndex(eps, userProgress)

  // 找不到未看集数, 可以看作为全部看过, 返回最后的数据
  if (index === -1) return eps.slice(length - maxLength, length)

  // 长篇动画从最后看过开始显示
  if (systemStore.setting.homeEpStartAtLastWathed) {
    const lastIndex = getLastWatchedIndex(eps, userProgress)
    return eps.slice(Math.max(lastIndex, 0), lastIndex + maxLength)
  }

  // 找到第 1 个未看过的集数, 返回 1 个看过的集数和剩余的集数
  // 注意这里第一个值不能小于 0, 不然会返回空
  return eps.slice(Math.max(0, index - maxLength + 1), index + maxLength - 1)
}

/** 格式化章节显示数字 */
export function formatCountRight(current: number | string, total: number | string) {
  // 二季度的番剧，首集非 1 开始的需要从所有章节里面获取最大集数
  if (total !== '??' && Number(current) > Number(total)) total = current

  switch (systemStore.setting.homeCountView) {
    case 'B':
      return total !== current ? `${current} (${total})` : `${current}`
    case 'C':
      return total !== current ? `${total} (${current})` : `${total}`
    case 'D':
      return total !== current ? `${current} / ${total}` : `${current}`
    default:
      return `${total}`
  }
}

/** 获取在线源头数据 */
export function getOnlineOrigins(type: number | string, origin: any) {
  const data: any[] = []

  if (Number(type) === 2) {
    getOriginConfig(origin, 'anime')
      .filter(item => item.active)
      .forEach(item => {
        data.push(item)
      })
  }

  if (Number(type) === 6) {
    getOriginConfig(origin, 'real')
      .filter(item => item.active)
      .forEach(item => {
        data.push(item)
      })
  }

  return data
}
