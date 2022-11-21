/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:25:29
 */
export type Props = {
  /** 当前进度 */
  epStatus: number

  /** 当前放送到 */
  current: number

  /** 总共多少集 */
  total: number

  /** 总共多少集没有数据时, 默认使用的集数 */
  defaultTotal?: number
}
