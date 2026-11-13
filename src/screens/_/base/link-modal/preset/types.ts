/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
export type Props = {
  /** 是否显示 */
  show: boolean

  /** 关闭回调 */
  onClose: () => void

  /** 选择预设 */
  onSelect: (link: string) => void
}
