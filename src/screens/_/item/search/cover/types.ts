/*
 * @Author: czy0729
 * @Date: 2026-08-07 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-07 10:00:00
 */
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'index' | 'cover' | 'typeCn'> & {
  /** 封面宽度 */
  width: number

  /** 封面高度 */
  height: number

  /** 纯数字条目 ID */
  subjectId: string

  /** 是否人物 */
  isMono: boolean
}
