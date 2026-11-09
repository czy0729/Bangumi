/*
 * @Author: czy0729
 * @Date: 2026-06-29 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-10 04:05:46
 *
 * 超展开页列表筛选与数据映射工具
 */
import { systemStore, userStore } from '@stores'
import { lastDate } from '@utils'
import { URL_DEFAULT_AVATAR } from '@constants'

import type { RakuenItem } from '@stores/rakuen/types'
import type { SearchReplyItem } from '@utils/kv/type'

/** 我回复的条目讨论取数上限 */
export const SUBJECT_REPLY_LIMIT = 50

/** 搜索结果命中词标记 */
const HIGHLIGHT_RE = /[\uE000\uE001]/g

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

/** 去掉服务端命中词标记 */
function stripHighlight(text: string) {
  return String(text || '').replace(HIGHLIGHT_RE, '')
}

/** 搜索回复转成超展开列表项, 同一讨论只保留最新一条 */
export function mapSubjectReplies(data: SearchReplyItem[] = []): RakuenItem[] {
  const items = Array.isArray(data) ? data : []
  const seen = new Set<number>()
  const list: RakuenItem[] = []
  for (const item of items) {
    if (!item?.containerID || seen.has(item.containerID)) continue
    seen.add(item.containerID)

    const createdAt = item.createdAt > 1e11 ? Math.floor(item.createdAt / 1000) : item.createdAt
    list.push({
      group: stripHighlight(item.parentName || ''),
      groupHref: '',
      avatar: '',
      userId: '',
      userName: '',
      title: stripHighlight(item.containerTitle || `#${item.containerID}`),
      href: `/rakuen/topic/subject/${item.containerID}`,
      // v1/search/replies 不返回容器回复数 (replyCount 仅存在于 subject-topics 端点), 列表 +N 无数据源
      replies: '',
      time: lastDate(createdAt, false),
      epoch: createdAt,
      _placeholder: true
    })
  }
  return list
}
