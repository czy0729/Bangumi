/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 10:33:32
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

  height?: number
}
