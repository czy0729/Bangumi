/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:43
 */
import { systemStore } from '@stores'
import { findLastIndex } from '@utils'

import type { UserProgress } from '@stores/user/types'
import type { Ep } from '@stores/subject/types'

/** 排除 SP 章节 */
export function getEpsNoSp(eps: readonly Ep[] | undefined) {
  return (eps || []).filter(item => item.type === 0)
}

/** 获取排除 SP 章节的数量 */
export function getEpsCount(
  subject: { eps?: readonly Ep[]; eps_count?: number },
  filterZero: boolean = true
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

/** 获取第一个未看章节的索引 */
export function getFirstUnwatchedIndex(eps: Ep[], userProgress: UserProgress) {
  return eps.findIndex(item => userProgress[item.id] !== '看过')
}

/** 获取最后一个已看章节的索引 */
export function getLastWatchedIndex(eps: Ep[], userProgress: UserProgress) {
  return findLastIndex(eps, (item: Ep) => userProgress[item.id] === '看过')
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

/** 解析「看到」批量更新需要提交的集数 */
export function resolveWatchedSort(
  displayEps: readonly Ep[],
  allEps: readonly Ep[],
  itemSort: number
) {
  const firstDisplaySort = displayEps?.[0]?.sort
  const firstAllSort = allEps?.[0]?.sort
  let sort: number | undefined

  // 从小于 10 开始的番剧都认为是非多季番, 直接使用正常 sort 去更新
  if (firstDisplaySort < 10) {
    sort = Math.max(itemSort, 0)
  } else {
    // 因 displayEps 是分页后的结果, 所以需要从原始数据中获取

    // 多季度非 1 开始的番 (如巨人第三季) 不能直接使用 sort,
    // 需要把 sp 去除后使用当前 itemSort 查找 index
    if (firstAllSort > 10) {
      const index = allEps.findIndex(i => i.sort === itemSort)
      sort = index === -1 ? undefined : index
    } else {
      // 正常的多章节番剧
      sort = allEps.find(i => i.sort === itemSort)?.sort
    }
  }

  // 查找失败回退当前章节的 sort, 不能让 NaN 参与提交
  if (sort === undefined || sort === -1) return itemSort

  // 原始章节第一个不是从 1 开始的, 才需要 +1
  if (firstAllSort !== 1) return sort + 1
  return sort
}
