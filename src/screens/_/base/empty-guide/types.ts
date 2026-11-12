/*
 * @Author: czy0729
 * @Date: 2026-11-08 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 15:20:00
 *
 * EmptyGuide 组件 Props
 */
import type { IconfontNames } from '@types'

export type Props = {
  /** 标题 */
  title: string

  /** 顶部图标 (缺省为人物图标) */
  icon?: IconfontNames

  /** 补充说明, 与 steps 二选一 */
  description?: string

  /** 步骤列表 */
  steps?: string[]

  /** 主按钮文案, 不传则不渲染按钮 */
  buttonText?: string

  /** 主按钮点击 */
  onPress?: () => void
}
