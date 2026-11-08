/*
 * @Author: czy0729
 * @Date: 2026-11-09 18:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 说明条参数
 */
export type Props = {
  /** 说明内容, 为空时不渲染 */
  value?: string

  /** 关闭 */
  onClose: () => void
}
