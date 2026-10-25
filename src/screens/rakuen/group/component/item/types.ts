/*
 * @Author: czy0729
 * @Date: 2026-10-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 */
import type { GroupItem } from '@stores/rakuen/types'

export type ItemProps = GroupItem & {
  /** 列表序号, 用于首项分割线与热区 */
  index: number

  /** 小组名称, 由列表下传, 避免每项订阅 groupInfo */
  group: string

  /** 时间是否使用最近格式, 由列表下传, 避免每项订阅 state */
  showLastDate: boolean
}
