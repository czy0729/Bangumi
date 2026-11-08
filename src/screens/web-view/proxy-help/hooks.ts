/*
 * @Author: czy0729
 * @Date: 2026-06-02 06:25:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 反代帖子列表: 首屏读云快照 + 接口分页累加
 */
import { useCallback, useState } from 'react'
import { info } from '@utils'
import { get, searchGroupTopics, update } from '@utils/kv'
import { getPagination, toRecommendTopics } from './utils'
import { AFTER, KEYWORD, LIMIT, SNAPSHOT_KEY } from './ds'

import type { ListEmpty } from '@types'
import type { RecommendTopicItem } from '@utils/kv/type'
import type { OtaSearchTopics } from './types'

const INITIAL_DATA: ListEmpty<RecommendTopicItem> = {
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
  const [data, setData] = useState<ListEmpty<RecommendTopicItem>>(INITIAL_DATA)

  const handleHide = useCallback(() => {
    setVisible(false)
  }, [])

  const handleSearch = useCallback(async (currentOffset: number) => {
    setLoading(true)

    try {
      // 首次加载先展示云快照, 随后的接口结果会覆盖
      if (currentOffset === 0) {
        const snapshot = await get<OtaSearchTopics>(SNAPSHOT_KEY)
        if (snapshot?.data?.length) {
          setData({
            list: snapshot.data,
            pagination: getPagination(snapshot.data.length, snapshot.pagination?.total || 0)
          })
        }
      }

      const result = await searchGroupTopics(KEYWORD, {
        target: 'title',
        limit: LIMIT,
        offset: currentOffset,
        after: AFTER,
        sort: 'oldest'
      })

      if (result?.data) {
        const newItems = toRecommendTopics(result.data)
        const nextOffset = currentOffset + newItems.length

        // 首屏返回空结果时保留快照内容, 不清空列表
        if (currentOffset !== 0 || newItems.length) {
          if (currentOffset === 0) {
            update(SNAPSHOT_KEY, {
              data: newItems,
              pagination: result.pagination
            })
          }

          setData(prev => ({
            list: currentOffset === 0 ? newItems : [...prev.list, ...newItems],
            pagination: getPagination(nextOffset, result.pagination?.total || 0)
          }))
        }
      }
    } catch {
      info('请求失败请重试')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleShow = useCallback(() => {
    setVisible(true)
    if (!data.list.length) handleSearch(0)
  }, [data.list.length, handleSearch])

  const handleLoadMore = useCallback(() => {
    if (!loading) handleSearch(data.list.length)
  }, [data.list.length, handleSearch, loading])

  return {
    /** 是否显示补充说明弹层 */
    visible,

    /** 是否正在加载 */
    loading,

    /** 帖子列表数据 */
    data,

    /** 隐藏补充说明弹层 */
    handleHide,

    /** 显示补充说明弹层并触发首次加载 */
    handleShow,

    /** 加载更多帖子 */
    handleLoadMore
  }
}
