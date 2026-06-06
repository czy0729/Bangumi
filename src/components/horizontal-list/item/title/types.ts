/*
 * @Author: czy0729
 * @Date: 2026-06-06 17:25:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06
 */
import type { ItemData } from '../../types'
import type { Props as ItemProps } from '../types'

/** 从 Item Props 中提取 Title 需要的属性 */
type PickedFromItem = Pick<ItemProps<ItemData>, 'findCn' | 'typeCn' | 'ellipsizeMode'>

export type Props = PickedFromItem & {
  /** 条目 ID */
  id?: string | number

  /** 条目名称 */
  name?: string
}
