/*
 * @Author: czy0729
 * @Date: 2026-11-07 01:38:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * ColumnSelect 组件 Props
 */
export type Props = {
  /** 是否选中 */
  select: boolean

  /** 是否禁用 */
  disabled?: boolean

  /** 切换选中状态 */
  onPress: (select: boolean) => void
}
