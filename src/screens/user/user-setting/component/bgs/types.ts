/*
 * @Author: czy0729
 * @Date: 2026-11-06 18:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * Bgs 子组件 Props
 */
export type Props = {
  /** 无背景项 (头像毛玻璃) 的图片地址 */
  avatar: string

  /** 是否已展开全部背景 */
  more: boolean

  /** 长按查看原图 */
  onViewOrigin: (item: string, index: number) => void

  /** 加载更多 */
  onMore: () => void
}
