/*
 * @Author: czy0729
 * @Date: 2024-02-10 13:49:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-10 13:51:05
 */
export type Props = {
  /** 已隐藏的格子数 */
  filterLength: number

  /** 因占比过小未排布的格子数 */
  hiddenCount: number

  /** 自己在名单里的下标, -1 为未上榜 */
  myIndex: number

  /** 只显示某一档 */
  onBatchFilter: (levelIndex: number) => void

  /** 定位到自己 */
  onLocate: () => void

  /** 重置全部隐藏 */
  onReset: () => void
}
