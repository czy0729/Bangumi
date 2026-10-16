/*
 * @Author: czy0729
 * @Date: 2026-10-16 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 12:00:00
 *
 * 数量/排名切换组件类型
 */
export type Props = {
  /** 是否选中「排名」 */
  value: boolean

  /** 切换回调, 回调参数为选中的文案 */
  onValueChange: (title: string) => void
}
