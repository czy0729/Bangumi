/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 21:00:28
 */
export type Props = {
  /** 是否选中 (bgm 无值且本地有值时) */
  select: boolean

  /** bgm 当前值文本 */
  text: string | number

  /** 本地同步后的值文本 */
  next: string | number
}
