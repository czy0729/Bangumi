/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:55
 */
import { systemStore, userStore } from '@stores'
import { getPinYinFilterValue, x18 } from '@utils'
import { getOriginConfig } from '@src/screens/user/origin-setting/utils'
import { TABS_ITEM } from '../../ds'

import type { OriginItem } from '@src/screens/user/origin-setting/utils'
import type { UserProgress } from '@stores/user/types'
import type { Ep } from '@stores/subject/types'
import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type { Origin } from '@types'
import type { Tabs } from '../../types'

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
export function getOnlineOrigins(type: number | string, origin: Origin) {
  const data: OriginItem[] = []
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
