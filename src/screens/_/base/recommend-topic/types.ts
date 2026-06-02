/*
 * @Author: czy0729
 * @Date: 2026-06-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 10:00:00
 */
import type { Fn, ListEmpty, WithNavigation } from '@types'
import type { RecommendTopicItem } from '@utils/kv/type'

export type Props = WithNavigation<{
  /** 标题 */
  title?: string

  /** 是否显示 */
  visible: boolean

  /** 加载中 */
  loading: boolean

  /** 推荐帖子数据 */
  data: ListEmpty<RecommendTopicItem>

  /** 图标大小 */
  iconSize?: number

  /** 到底文案 */
  footerNoMoreText?: string

  /** 显示推荐 */
  onShow: Fn

  /** 隐藏推荐 */
  onHide: Fn

  /** 加载更多 */
  onLoadMore: Fn
}>
