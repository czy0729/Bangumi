/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
export type Props = {
  /** 是否显示全部功能 */
  all: boolean

  /** 状态栏高度 */
  statusBarHeight: number

  /** 关闭回调 */
  onClose: () => void
}
