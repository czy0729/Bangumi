/*
 * @Author: czy0729
 * @Date: 2026-11-08 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 反代帖子: 接口条目转推荐帖子项 + 分页计算
 */
import { LIMIT } from './ds'

import type { ListEmpty } from '@types'
import type { GroupTopicsItem, RecommendTopicItem } from '@utils/kv/type'

/** 超展开接口条目转推荐帖子项 */
export function toRecommendTopics(list: GroupTopicsItem[]): RecommendTopicItem[] {
  return list.map(item => ({
    id: item.id,
    title: item.title,
    similarity: 0,
    url: `/group/topic/${item.id}`,
    group_slug: item.group?.name || '',
    created_at: new Date(item.createdAt * 1000).toISOString(),
    reply_count: item.replyCount,
    group_name: item.group?.title || '',
    user_username: item.creator?.username || '',
    user_nickname: item.creator?.nickname || '',
    user_avatar: item.creator?.avatar?.medium || '',
    content: item.content || ''
  }))
}

/**
 * 分页信息
 *
 * @param loaded 已加载条数
 * @param total 服务端总条数, 未知传 0
 */
export function getPagination(
  loaded: number,
  total: number
): NonNullable<ListEmpty['pagination']> {
  const page = Math.floor(loaded / LIMIT)
  const hasMore = loaded >= LIMIT && total > loaded

  return {
    page,
    pageTotal: hasMore ? Math.ceil(total / LIMIT) : page
  }
}
