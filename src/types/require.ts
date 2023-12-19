/*
 * @Author: czy0729
 * @Date: 2022-10-03 11:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 05:32:32
 */

/** src/assets/proto/bangumi-data/index.proto */
export type BangumiData = {
  id: number
  j: string
  c?: string
  s?: {
    /** bilibili */
    b?: number

    /** bilibili hk */
    bhmt?: number

    /** iqiyi */
    i?: string

    /** qq */
    q?: string
  }
}[]
