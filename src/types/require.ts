/*
 * @Author: czy0729
 * @Date: 2022-10-03 11:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-12 20:53:54
 */

/** src/assets/proto/bangumi-data/index.proto */
export type BangumiData = {
  /** 条目 ID */
  id: number

  /** 日文名 */
  j: string

  /** 中文名 */
  c?: string

  /** 站点 ID */
  s?: {
    /** bilibili */
    b?: number

    /** bilibili hk */
    bhmt?: number

    /** mal */
    mal?: number

    /** anidb */
    adb?: number
  }
}[]
