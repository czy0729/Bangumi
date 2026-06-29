/*
 * @Author: czy0729
 * @Date: 2026-06-29 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-29 00:00:00
 */
import { systemStore, userStore } from '@stores'
import { URL_DEFAULT_AVATAR } from '@constants'

import type { RakuenItem } from '@stores/rakuen/types'

/** 18x 关键字列表 */
const BLOCKED_KEYWORDS = ['gal', '性', '癖', '里番'] as const

/**
 * 检查是否需要筛选帖子列表
 */
export function shouldFilterRakuen(): boolean {
  const { filterDefault, filter18x } = systemStore.setting
  return filterDefault || filter18x || userStore.isLimit
}

/**
 * 筛选帖子列表
 *  - 屏蔽默认头像用户相关信息
 *  - 屏蔽 18x 关键字
 *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽
 */
export function filterRakuenList(list: RakuenItem[]): RakuenItem[] {
  const { filterDefault, filter18x } = systemStore.setting
  const shouldFilterDefault = filterDefault || userStore.isLimit
  const shouldFilter18x = filter18x || userStore.isLimit

  if (!shouldFilterDefault && !shouldFilter18x) return list

  return list.filter(item => {
    // 屏蔽默认头像用户
    if (shouldFilterDefault && item?.avatar?.includes(URL_DEFAULT_AVATAR)) {
      return false
    }

    // 屏蔽 18x 关键字
    if (shouldFilter18x) {
      const group = String(item.group).toLocaleLowerCase()
      if (BLOCKED_KEYWORDS.some(keyword => group.includes(keyword))) {
        return false
      }
    }

    return true
  })
}
