/*
 * @Author: czy0729
 * @Date: 2026-11-08 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 10:00:00
 *
 * EmptyGuide 组件 Props
 */
export type Props = {
  /** 标题 */
  title: string

  /** 补充说明, 与 steps 二选一 */
  description?: string

  /** 步骤列表 */
  steps?: string[]

  /** 主按钮文案, 不传则不渲染按钮 */
  buttonText?: string

  /** 主按钮点击 */
  onPress?: () => void
}
