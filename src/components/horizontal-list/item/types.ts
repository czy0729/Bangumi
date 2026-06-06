/*
 * @Author: czy0729
 * @Date: 2026-06-06 17:28:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 17:38:38
 */
import type { ItemData, TypeCn } from '../types'
import type { Props as HorizontalListProps } from '../types'

/** 从根 Props 中提取 Item 需要的属性 */
type PickedFromParent = Pick<
  HorizontalListProps,
  'width' | 'height' | 'findCn' | 'typeCn' | 'relationTypeCn' | 'ellipsizeMode'
>

export type Props<T extends ItemData = ItemData> = PickedFromParent & {
  /** 单条数据 */
  item: T

  /** 计数 */
  count?: number

  /** 是否第一项 */
  isFirst?: boolean

  /** item 点击回调 */
  onPress?: (payload: T, typeCn?: TypeCn) => void

  /** item 描述点击回调 */
  onSubPress?: (payload: T) => void
}
