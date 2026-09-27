/*
 * @Author: czy0729
 * @Date: 2025-12-15 17:53:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 17:54:21
 *
 * 省略提示类型
 */
export type Props = {
  /** 被省略的节点数 */
  count: number

  /** 省略位置 */
  position: 'top' | 'bottom'

  /** 点击展开回调 */
  onPress: () => void
}
