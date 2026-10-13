/*
 * @Author: czy0729
 * @Date: 2026-10-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 注目榜半宽卡片类型
 */
import type { ChannelRankItem } from '@stores/discovery/types'

export type Props = {
  /** 条目数据 */
  item: ChannelRankItem

  /** 分组内索引 (决定排名与左右间距) */
  index: number

  /** 懒渲染触发坐标 */
  y: number
}
