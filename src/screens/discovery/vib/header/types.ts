/*
 * @Author: czy0729
 * @Date: 2024-05-16 14:17:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:40:11
 */
export type Props = {
  /** 各期标题 */
  data: string[]

  /** 切期回调 (参数为期数下标) */
  onSelect: (index: number) => void
}
