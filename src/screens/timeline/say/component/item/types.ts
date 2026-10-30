/*
 * @Author: czy0729
 * @Date: 2025-10-24 15:05:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 对话条目属性
 */
import type { SayItem } from '@stores/timeline/types'
import type { RenderItem } from '@types'

export type Props = RenderItem<SayItem> & {
  /** 是否显示用户名 (与上一条同名时省略) */
  showName: boolean

  /** 是否末条 (显示日期) */
  isLast: boolean
}
