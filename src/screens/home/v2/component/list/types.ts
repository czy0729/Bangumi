/*
 * @Author: czy0729
 * @Date: 2024-08-04 16:29:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 06:21:16
 */
import type { UserCollectionsItem } from '@stores/collection/types'
import type { UserCollectionItem } from '@stores/user/types'
import type { TabsLabel } from '../../types'

export type Props = {
  /** 当前 Tab 标题 */
  title: TabsLabel
}

export type ItemType = UserCollectionItem | UserCollectionsItem

/** 列表渲染元素构造参数 */
export type UseListElementsOptions = {
  /** 当前 Tab 标题 */
  title: TabsLabel

  /** 是否渲染条目（iOS 未激活 Tab 为 false） */
  showItem: boolean

  /** 是否启用文字过滤头部 */
  homeFilter: boolean

  /** 当前列表条目数 */
  length: number
}
