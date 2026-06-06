/*
 * @Author: czy0729
 * @Date: 2026-06-06 17:20:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06
 */
import type { ItemData, TypeCn } from '../../types'

export type Props<T extends ItemData = ItemData> = {
  /** 单条数据 */
  item: T

  /** 条目类型中文 */
  typeCn?: TypeCn

  /** item 描述点击回调 */
  onPress?: (payload: T, typeCn?: TypeCn) => void
}
