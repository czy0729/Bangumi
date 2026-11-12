/*
 * @Author: czy0729
 * @Date: 2026-11-13 15:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 15:20:00
 *
 * 已选条件组件类型
 */
import type { EventKeys } from '@types'

/** 已选条件项 */
export type SelectedItem = {
  /** 查询键 (FilterItem.type) */
  type: string

  /** 选中值 */
  value: string | number

  /** 是否数组形态 (宿主侧决定移除语义) */
  multiple: boolean
}

export type Props = {
  /** 已选条件列表 */
  items: SelectedItem[]

  /** 埋点事件标识 (缺省不渲染埋点) */
  eventId?: EventKeys

  /** 移除单个条件 */
  onRemove: (item: SelectedItem) => void

  /** 全部重置回调 */
  onReset: () => void
}
