/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:05:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-19 14:05:54
 */
export type Props = {
  /** 容器长度 */
  width?: number

  /** 是否显示 */
  show?: boolean

  /** 提示文字 */
  message?: string

  /** 当前计数 */
  current: number

  /** 总计数 */
  total: number
}
