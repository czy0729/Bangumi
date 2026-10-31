/*
 * @Author: czy0729
 * @Date: 2026-01-31 14:30:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 条目属性
 */
import type { TimelineItem } from '@stores/timeline/types'
import type { TabLabel } from '../../types'
import type { Override, RenderItem } from '@types'

export type Props = Override<
  RenderItem<TimelineItem>,
  {
    title: TabLabel
  }
>
