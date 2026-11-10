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
import { WATAAME_LIMIT } from './ds'

import type { RakuenItem } from '@stores/rakuen/types'
import type { GroupTopicsItem, SearchReplyItem } from '@utils/kv/type'
import type { Wataame } from './ds'

/** 各 tab 的「我回复」对应的搜索来源 */
const REPLY_TYPE_SOURCE: Record<string, string> = {
  subject_reply: 'subject',
  ep_reply: 'episode',
  mono_reply_character: 'character',
  mono_reply_person: 'person'
}

/** 回复来源对应的超展开链接前缀 */
const REPLY_HREF_PREFIX: Record<string, string> = {
  group: '/rakuen/topic/group/',
  subject: '/rakuen/topic/subject/',
  episode: '/rakuen/topic/ep/',
  character: '/rakuen/topic/crt/',
  person: '/rakuen/topic/prsn/',
  blog: '/blog/'
}

/** 可作为搜索来源的回复类型 */
const REPLY_SEARCH_SOURCES = ['group', 'subject', 'episode', 'character', 'person', 'blog'] as const

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

/** 时间戳归一化为秒 */
function itemTime(ts?: number) {
  if (!ts) return { time: '', epoch: 0 }

  const epoch = ts > 1e11 ? Math.floor(ts / 1000) : ts
  return { time: lastDate(epoch, false), epoch }
}

/** 构造列表项, 默认走无头像的文字占位 */
function createItem(item: Partial<RakuenItem>): RakuenItem {
  return {
    group: '',
    groupHref: '',
    avatar: '',
    userId: '',
    userName: '',
    title: '',
    href: '',
    replies: '',
    time: '',
    epoch: 0,
    _placeholder: true,
    ...item
  }
}

/** 是否为各 tab 的「我回复」类型 */
export function isReplyType(type: string) {
  return Object.prototype.hasOwnProperty.call(REPLY_TYPE_SOURCE, type)
}

/** 从类型解析回复来源 */
export function getReplySource(type: string) {
  return REPLY_TYPE_SOURCE[type] ?? ''
}

/** 是否需要登录才能取数 */
export function isMyReplyType(type: string) {
  return isReplyType(type) || type.startsWith('all_reply_')
}

/** 从类型解析 wataame 来源 key, 与主站 HTML 的 type 同名不同域 */
export function getDataSourceKey(type: string) {
  if (isReplyType(type)) return getReplySource(type)
  if (type === 'all_hot') return 'hot'
  if (type.startsWith('all_reply_')) return type.replace('all_reply_', '')
  return ''
}

/** 是否走 wataame 数据源 */
export function isWataameType(type: string) {
  return !!getDataSourceKey(type)
}

/** 回复来源是否有效 */
export function isValidReplySource(key: string) {
  return (REPLY_SEARCH_SOURCES as readonly string[]).includes(key)
}

/** 24 小时内热门话题转成超展开列表项 */
export function mapGroupTopics(data: GroupTopicsItem[] = []): RakuenItem[] {
  return (Array.isArray(data) ? data : []).map(item => {
    const avatar = item.creator?.avatar?.small || ''
    return createItem({
      group: stripHighlight(item.group?.title || item.group?.name || ''),
      groupHref: item.group?.name ? `/group/${item.group.name}` : '',
      avatar,
      userId: String(item.creator?.id ?? ''),
      userName: stripHighlight(item.creator?.nickname || item.creator?.username || ''),
      title: stripHighlight(item.title || ''),
      href: `/rakuen/topic/group/${item.id}`,
      replies: String(item.replyCount ?? ''),
      ...itemTime(item.createdAt),
      _placeholder: !avatar
    })
  })
}

/** 搜索回复转成超展开列表项, 同一讨论只保留最新一条 */
export function mapReplies(data: SearchReplyItem[] = []): RakuenItem[] {
  const items = Array.isArray(data) ? data : []
  const seen = new Set<string>()
  const list: RakuenItem[] = []
  for (const item of items) {
    if (!item?.containerID) continue

    const key = `${item.source}:${item.containerID}`
    if (seen.has(key)) continue
    seen.add(key)

    const prefix = REPLY_HREF_PREFIX[item.source] || REPLY_HREF_PREFIX.subject
    list.push(
      createItem({
        group: stripHighlight(item.parentName || ''),
        title: stripHighlight(item.containerTitle || `#${item.containerID}`),
        href: `${prefix}${item.containerID}`,
        // v1/search/replies 不返回容器回复数, 列表 +N 无数据源
        replies: '',
        ...itemTime(item.createdAt)
      })
    )
  }
  return list
}

/** wataame 列表分页信息, 页数一律由已拉取条数换算, 与服务端回显的 limit 无关 */
export function getWataamePagination(total: number, offset: number) {
  const page = Math.max(1, Math.ceil(offset / WATAAME_LIMIT))
  if (!total) return { page, pageTotal: page }

  return {
    page,
    pageTotal: Math.max(page, Math.ceil(total / WATAAME_LIMIT))
  }
}

/** wataame 列表是否还能加载更多 */
export function hasMoreWataame(data: Wataame) {
  return (data._offset || 0) < (data._total || 0)
}

/** 合并两批 wataame 列表, 同一链接只保留先出现的一条 */
export function mergeWataame(previous: RakuenItem[], next: RakuenItem[]) {
  const seen = new Set<string>()
  const list: RakuenItem[] = []
  for (const item of previous.concat(next)) {
    if (seen.has(item.href)) continue

    seen.add(item.href)
    list.push(item)
  }
  return list
}
