/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:10:48
 */
import type { ItemNew } from '../../../types'

export type Props = {
  /** 条目数据 */
  item: ItemNew

  /** 列表序号 (从 0 开始) */
  index: number
}
