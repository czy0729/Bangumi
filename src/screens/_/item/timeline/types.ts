/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:50:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-09 00:00:00
 */
import type { EventType, UserId, WithNavigation, WithViewStyles } from '@types'
import type { TimelineItem } from '@stores/timeline/types'

/** ItemTimeline 组件 props，时间胶囊数据结构从 TimelineItem 继承，其余为 UI 控制参数 */
export type Props = WithNavigation<
  WithViewStyles<
    Partial<TimelineItem> & {
      /** 是否完整显示（含右侧头像） */
      full?: boolean

      /** 列表索引 */
      index?: number

      /** 埋点对象 */
      event?: EventType

      /** 删除回调 */
      onDelete?: (clearHref?: string) => any

      /** 隐藏 TA 回调 */
      onHidden?: (title?: string, userId?: UserId) => any
    }
  >
>
