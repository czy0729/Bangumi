/*
 * @Author: czy0729
 * @Date: 2026-11-12 22:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 22:21:17
 *
 * 筛选候选项组件类型
 */
import type { EventKeys } from '@types'

export type Props = {
  /** 选项文案 */
  label: string

  /** 结果数 (条件计数优先, 未就绪回落 FilterItem.nums 静态分布; 0 不渲染但置灰) */
  num?: number

  /** 是否选中 */
  active?: boolean

  /** 是否禁用 (条件计数为零结果) */
  disabled?: boolean

  /** 是否支持长按多选 */
  multiSelect?: boolean

  /** 埋点事件标识 */
  eventId: EventKeys

  /** 点击回调 */
  onPress: () => void

  /** 长按回调 */
  onLongPress?: () => void
}
