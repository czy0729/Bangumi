/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:50:35
 */
export type Props = {
  /** 当前进度 */
  epStatus: number | string

  /** 当前放送到 */
  current: number

  /** 总共多少集 */
  total: number

  /** 总共多少集没有数据时, 默认使用的集数 */
  defaultTotal?: number

  /** 组件高度 */
  height?: number
}
