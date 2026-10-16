/*
 * @Author: czy0729
 * @Date: 2026-10-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 00:00:00
 *
 * 系列分组条目 props
 */
import type { SubjectId } from '@types'

export type Props = {
  /** 系列分组 */
  item: SubjectId[]

  /** 列表序号 */
  index: number
}

/** 子条目列表 props */
export type SubListProps = {
  /** 系列组主条目 ID */
  id: SubjectId

  /** 所属行的列表序号 */
  index: number

  /** 子条目 */
  sub: SubjectId[]
}
