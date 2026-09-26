/*
 * @Author: czy0729
 * @Date: 2026-09-26 21:42:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 21:42:02
 */
export type Props = {
  /** 目录标题 */
  title: string

  /** 占比最高的条目类型 */
  typeCn?: string

  /** 目录描述 */
  desc: string

  /** 收藏数 */
  collect?: null | string

  /** 标题高亮值 */
  filter?: string
}
