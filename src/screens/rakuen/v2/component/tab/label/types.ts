/*
 * @Author: czy0729
 * @Date: 2025-10-17 11:20:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:31:16
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
}
