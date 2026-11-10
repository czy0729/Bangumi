/*
 * @Author: czy0729
 * @Date: 2025-10-17 11:20:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 分类标签属性
 */
import type { ModelItem } from '@types'

export type Model = {
  data: readonly ModelItem[]
  getLabel: (value: string) => string | false
}

export type Props<T extends Model> = {
  focused: boolean
  model: T
  label: string
  value: T['data'][number]['value']
  onSelect: (label: T['data'][number]['label']) => void

  /** 副标题短文案 */
  subLabel?: string

  /** 菜单激活方式, 未选中的 tab 用 hold 让点击归切换 */
  activateOn?: 'tap' | 'hold' | 'tap-hold'

  /** 点击回调, hold 模式下与菜单共存 */
  onPress?: () => void
}
