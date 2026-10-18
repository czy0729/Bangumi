/*
 * @Author: czy0729
 * @Date: 2024-05-16 14:20:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 08:22:16
 */
import type { Data } from '../../types'

export type Props = {
  /** 各期数据 */
  data: Data

  /** 当前期下标 */
  index: number

  /** 切期回调 */
  onSelect: (index: number) => void
}
