/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:13:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 02:53:46
 */
import type { ColorValue, Fn, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 开关是否选中 */
  checked?: boolean

  /** 是否禁用 */
  disabled?: boolean

  /** 选中状态的颜色 */
  color?: ColorValue

  /** 切换回调 */
  onChange?: Fn
}>
