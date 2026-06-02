/*
 * @Author: czy0729
 * @Date: 2026-06-02 06:25:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 10:30:00
 */
import { useCallback, useState } from 'react'
import { info } from '@utils'
import { searchGroupTopics } from '@utils/kv'

import type { RecommendTopicItem } from '@utils/kv/type'
import type { ListEmpty } from '@types'

const LIMIT = 20

const initialData: ListEmpty<RecommendTopicItem> = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 1
  }
}

/** 代理补充说明页面逻辑 */
export function useProxyHelpPage() {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ListEmpty<RecommendTopicItem>>(initialData)
  const [offset, setOffset] = useState(0)

  const handleHide = useCallback(() => {
    setVisible(false)
  }, [])

  const handleSearch = useCallback(async (currentOffset: number) => {
    setLoading(true)
    try {
      const result = await searchGroupTopics('反代', {
        target: 'title',
        limit: LIMIT,
        offset: currentOffset,
        after: '2026-05-28'
      })

      if (result?.data) {
        const newItems = result.data.map(item => ({
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

        // 当返回数据少于 limit 时，表示没有更多数据
        const hasMore = newItems.length >= LIMIT

        setData(prev => ({
          list: currentOffset === 0 ? newItems : [...prev.list, ...newItems],
          pagination: {
            page: Math.floor((currentOffset + newItems.length) / LIMIT),
            pageTotal: hasMore
              ? Math.ceil((result.pagination?.total || 0) / LIMIT)
              : Math.floor((currentOffset + newItems.length) / LIMIT)
          }
        }))
        setOffset(currentOffset + newItems.length)
      }
    } catch (error) {
      info('请求失败请重试')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleShow = useCallback(() => {
    setVisible(true)
    if (!data.list.length) {
      handleSearch(0)
    }
  }, [data.list.length, handleSearch])

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      handleSearch(offset)
    }
  }, [handleSearch, loading, offset])

  return {
    visible,
    loading,
    data,
    handleHide,
    handleShow,
    handleLoadMore
  }
}
